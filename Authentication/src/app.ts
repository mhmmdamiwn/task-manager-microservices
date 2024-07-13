import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './app/Containers/Authentication/Swaggers/swagger.json'; // Adjust path as needed
import { sequelize } from './app/Ship/Configs/Database';
import authRoutes from './app/Containers/Authentication/Routes/AuthRoutes';
import {initModels} from './app/Containers/Authentication/Models';
import { RabbitMQHelper } from './app/Ship/Helpers/RabbitMQHelper';
import {TokenVerificationListener} from "./app/Containers/Authentication/Listeners/TokenVerificationListener";
import RedisClient from "./app/Ship/Configs/Redis";

// Initialize Express application
const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server after syncing the database
const PORT = process.env.PORT || 3001;

// Connect to Redis
RedisClient.connect()
    .then()
    .catch((err) => {
        console.error('Error connecting to Redis:', err);
    });

// Connect to Postgres
sequelize.sync().then(() => {
    // initializing the models
    initModels(sequelize)
}).catch(()=>{
    console.log('database error')
});

// Connect to Rabbitmq
RabbitMQHelper.connect('amqp://user:password@rabbitmq:5672').then(()=>{
    // start listening to the messages from the Task management service
    TokenVerificationListener.startListening(
        'verify_token_queue'
    ).catch(console.error);

    // starting the server
    app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });

}).catch(()=>{
    console.log('rabbit mq connection error')
});

export default app;

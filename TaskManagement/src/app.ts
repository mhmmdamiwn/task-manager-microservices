import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './app/Containers/TasksManagement/Swaggers/swagger.json'; // Adjust path as needed
import { sequelize } from './app/Ship/Configs/Database';
import TaskRoutes from './app/Containers/TasksManagement/Routes/TaskRoutes';
import {initModels} from './app/Containers/TasksManagement/Models';
import {RabbitMQHelper} from "./app/Ship/Helpers/RabbitMQHelper";
import {TaskServiceListener} from "./app/Containers/TasksManagement/Listeners/TaskServiceListener";
import {rateLimiter} from "./app/Containers/TasksManagement/Middlewares/RateLimiter";
import RedisClient from "./app/Ship/Configs/Redis";

// Initialize Express application
const app: Application = express();

// Apply the rate limiter middleware globally
app.use(rateLimiter);

// Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/tasks', TaskRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server after syncing the database
const PORT = process.env.PORT || 3002;

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
    // start listening to the messages from the Authentication service
    TaskServiceListener.startListening(
        'verify_token_response_queue'
    ).catch(console.error);

    // starting the server
    app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });

}).catch(()=>{
    console.log('rabbit mq connection error')
});

export default app;

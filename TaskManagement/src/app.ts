import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './app/Containers/TasksManagment/Swaggers/swagger.json'; // Adjust path as needed
import { sequelize } from './app/Ship/Configs/Database';
import TaskRoutes from './app/Containers/TasksManagment/Routes/TaskRoutes';
import {initModels} from './app/Containers/TasksManagment/Models';
import {RabbitMQHelper} from "./app/Ship/Helpers/RabbitMQHelper";
import {TaskServiceListener} from "./app/Containers/TasksManagment/Listeners/TaskServiceListener";
import {rateLimiter} from "./app/Containers/TasksManagment/Middlewares/RateLimiter";
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

sequelize.sync().then(() => {
    initModels(sequelize)
    RabbitMQHelper.connect('amqp://user:password@localhost:5672').then(()=>{
        TaskServiceListener.startListening(
            'verify_token_response_queue'
        ).catch(console.error);
        app.listen(PORT, () => {
            console.log(`Auth Service is running on port ${PORT}`);
        });
    }).catch(()=>{
        console.log('rabbit mq connection error')
    });
}).catch((err)=>{
    console.log('database error',err)
});

export default app;
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json'; // Adjust path as needed
import { sequelize } from './app/Ship/Configs/Database';
import authRoutes from './app/Containers/Authentication/Routes/AuthRoutes';
import {initModels} from './app/Containers/Authentication/Models';

// Initialize Express application
const app: Application = express();

// Middleware
app.use(bodyParser.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server after syncing the database
const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Auth Service is running on port ${PORT}`);
    });
});

initModels(sequelize)


export default app;

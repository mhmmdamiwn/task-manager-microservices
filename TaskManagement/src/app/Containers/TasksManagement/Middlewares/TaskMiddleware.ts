import { Request, Response, NextFunction } from 'express';
import { User } from '../Models';
import { RabbitMQHelper } from '../../../Ship/Helpers/RabbitMQHelper'; // Adjust path as per your structure
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'events';
import {TaskServiceListener} from "../Listeners/TaskServiceListener";

const eventEmitter:EventEmitter = TaskServiceListener.getEventEmitter();

// Define a new interface that extends the existing Request interface
interface AuthenticatedRequest extends Request {
    user?: User & { role?: string }; // Define user property of type User | undefined
}

interface AuthResponse {
    user: User;
    role: string;
    error?: string;
}

export const TaskMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    try {
        const correlationId = uuidv4(); // Generate a unique correlation ID
        // Send message to auth service to verify token with the correlation ID
        await RabbitMQHelper.sendMessage('verify_token_queue', JSON.stringify({ token, correlationId }));

        eventEmitter.once(correlationId, async (authResponse: AuthResponse) => {
            if (authResponse.error) {
                return res.status(401).json({ error: 'Invalid token.' });
            }

            const decoded = authResponse as AuthResponse;
            const user = await User.findByPk(decoded.user.id); // Fetch user from database using decoded id

            if (!user) {
                return res.status(401).json({ error: 'User not found.' });
            }

            // Attach user object to request for further middleware/route handlers
            req.user = user;
            req.user.role = decoded.role;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

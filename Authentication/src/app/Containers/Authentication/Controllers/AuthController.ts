import { Request, Response } from 'express';
import { RegisterUser } from '../Actions/RegisterUser';
import { LoginUser } from '../Actions/LoginUser';
import jwt from 'jsonwebtoken';
import { AuthMiddleware } from '../Middlewares/AuthMiddleware';
interface MyError extends Error {
    message: string;
}

interface LoginResult {
    id: number;
    token: string;
}

export class AuthController {
    public static async register(req: Request, res: Response) {
        try {
            const result = await RegisterUser.execute(req.body);
            res.json(result);
        } catch (error) {
            AuthController.handleError(res, error as MyError);
        }
    }

    public static async login(req: Request, res: Response) {
        try {
            const result: LoginResult = await LoginUser.execute(req.body);

            if (!result.id) {
                throw new Error('User id not found in login result');
            }

            // Generate JWT token
            const token = jwt.sign({ id: result.id }, 'secretKey', { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            AuthController.handleError(res, error as MyError);
        }
    }

    private static handleError(res: Response, error: MyError) {
        const errorResponse = { error: error.message };
        res.status(500).json(errorResponse);
    }
}

// Middleware to verify token for login
export const verifyLoginToken = [AuthMiddleware, AuthController.login];

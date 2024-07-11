import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../Models';
import { TokenHelper } from '../../../Ship/Helpers/TokenHelper'; // Adjust path as per your structure


interface DecodedUser extends JwtPayload {
    id: number; // Assuming id is a number in your User model
}

// Define a new interface that extends the existing Request interface
interface AuthenticatedRequest extends Request {
    user?: User; // Define user property of type User | undefined
}

export const AuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        }); // Fetch user from database using decoded id

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        // Attach user object to request for further middleware/route handlers
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Invalid token.' });
    }
};

import { Request, Response, NextFunction } from 'express';
import { Role } from '../Models/Role';
import { User } from '../Models/User'; // Assuming User model import

declare global {
    namespace Express {
        interface Request {
            user?: User; // Extend Request interface to include user property
        }
    }
}

export const RoleMiddleware = (requiredRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Access denied, no user found.' });
        }

        try {
            const roles = await Role.findAll({ include: [{ model: User, where: { id: user.id } }] });

            if (roles.some(role => role.name === requiredRole)) {
                next();
            } else {
                res.status(403).json({ error: 'Access denied.' });
            }
        } catch (error) {
            console.error('RoleMiddleware error:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    };
};

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegister = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];

export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check for unexpected keys in the request body
    const allowedKeys = ['email', 'password']; // Add other allowed keys if needed
    const bodyKeys = Object.keys(req.body);
    const unexpectedKeys = bodyKeys.filter(key => !allowedKeys.includes(key));

    if (unexpectedKeys.length > 0) {
        return res.status(400).json({ error: `Unexpected keys in request body: ${unexpectedKeys.join(', ')}` });
    }

    next();
}

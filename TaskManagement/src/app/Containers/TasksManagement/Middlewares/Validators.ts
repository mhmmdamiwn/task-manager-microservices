// Middlewares/Validators.ts
import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import dayjs from "dayjs";

export const validateTask = [
    body('title').notEmpty().isString().withMessage('Title is required'),
    body('description').notEmpty().isString().withMessage('Description is required'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('dueDate')
        .notEmpty()
        .custom(value => {
            const parsedDate = dayjs(value, 'YYYY-MM-DD HH:mm:ss', true);
            if (!parsedDate.isValid()) {
                throw new Error('Invalid due date format');
            }
            return true;
        }),
    handleValidationErrors
];

export const validateUpdateTask = [
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    body('dueDate').optional().isISO8601().toDate().withMessage('Invalid due date'),
    handleValidationErrors
];

export const validateTaskId = [
    param('id').isNumeric().withMessage('Task ID must be a number'),
    handleValidationErrors
];

// New validation for search
export const validateSearchTasks = [
    query('title').optional().isString(),
    query('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    query('userId').optional().isNumeric().withMessage('User ID must be a number'),
    query('dueDate').optional().isISO8601().withMessage('Invalid due date'),
    handleValidationErrors
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

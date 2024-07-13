import { Request, Response, NextFunction } from 'express';

export const ControllerHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
    errorHandler?: (error: any, req: Request, res: Response, next: NextFunction) => void
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            if (errorHandler) {
                errorHandler(error, req, res, next);
            } else {
                const statusCode = error.statusCode || 500;
                const errorResponse = { error: error.message || 'Internal Server Error' };
                res.status(statusCode).json(errorResponse);
            }
        });
    };
};

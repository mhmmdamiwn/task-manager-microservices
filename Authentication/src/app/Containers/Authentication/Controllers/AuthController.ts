import { Request, Response } from 'express';
import { RegisterUser } from '../Actions/RegisterUser';
import { LoginUserAction } from '../Actions/LoginUserAction';

export class AuthController {
    public static async register(req: Request, res: Response) {
            const result = await RegisterUser.execute(req.body);
            res.json(result);
    }

    public static async login(req: Request, res: Response) {
            const token = await LoginUserAction.run(req);
            res.json({ token });
    }
}


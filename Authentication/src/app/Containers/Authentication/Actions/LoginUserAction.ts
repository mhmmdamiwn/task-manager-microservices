import bcrypt from 'bcryptjs';
import { User,UserRole,Role } from '../Models';
import { TokenHelper } from '../../../Ship/Helpers/TokenHelper';
import {ErrorHandler} from "../../../Ship/Handlers/ErrorHandler";
import jwt from "jsonwebtoken";
import { Request } from 'express';

export class LoginUserAction {
    static async run(req: Request) {
        const data:{ email: string; password: string } = req.body
        const user = await User.findOne({ where: { email: data.email } });

        if (!user) {
            throw new ErrorHandler('user not found', 404);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new ErrorHandler('Invalid password. But we do not return this in the production', 400);
        }

        // Fetch user's role from database
        const userRole = await UserRole.findOne({
            where: { userId: user.id },
            include: [{ model: Role, as: 'role' }]
        });
        const role =  userRole?.role?.name

        const generatedToken = TokenHelper.generateToken({ ...user.toJSON(), role }); // Generate token

        const result =  { id: user.id, generatedToken }; // Return token and user ID

        if (!result.id) {
            throw new ErrorHandler('user not found', 404);
        }

        return jwt.sign({ id: result.id }, 'secretKey', { expiresIn: '1h' });

    }
}

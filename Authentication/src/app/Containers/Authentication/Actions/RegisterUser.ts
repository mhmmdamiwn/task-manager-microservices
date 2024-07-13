// models
import { User,UserRole,Role } from '../Models';

// bases
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class RegisterUser {
    static async execute(data: { email: string; password: string; }) {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new Error('User with this email already exists.' +
                ' By the way we do not return an error like this in the production environment for security reasons.' +
                ' This is just for the development and your tests.');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({ email: data.email, password: hashedPassword });

        const role = await Role.findOne({ where: { name: 'user' } });
        if (role) {
            await UserRole.create({ userId: user.id, roleId: role.id });
        }


        const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey');
        return { user, token };
    }
}

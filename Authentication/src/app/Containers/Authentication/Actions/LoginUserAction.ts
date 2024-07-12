import bcrypt from 'bcryptjs';
import { User,UserRole,Role } from '../Models';
import { TokenHelper } from '../../../Ship/Helpers/TokenHelper'; // Adjust path as per your structure

export class LoginUserAction {

    static async run(data: { email: string; password: string }) {
        const user = await User.findOne({ where: { email: data.email } });
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        // Fetch user's role from database
        const userRole = await UserRole.findOne({
            where: { userId: user.id },
            include: [{ model: Role, as: 'role' }] // Specify the alias 'role' here
        });
        const role =  userRole?.role?.name

        const token = TokenHelper.generateToken({ ...user.toJSON(), role }); // Generate token
        return { id: user.id, token }; // Return token and user ID
    }
}

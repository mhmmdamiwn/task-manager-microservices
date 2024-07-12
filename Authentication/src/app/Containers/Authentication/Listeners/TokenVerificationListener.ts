import { TokenHelper } from '../../../Ship/Helpers/TokenHelper';
import { RabbitMQHelper } from '../../../Ship/Helpers/RabbitMQHelper';
import { User, UserRole, Role } from '../Models';

export class TokenVerificationListener {
    public static async startListening(channel: string) {
        await RabbitMQHelper.listen(channel, async (msg) => {
            if (msg !== null) {
                const { token, correlationId } = JSON.parse(msg.content.toString());
                let response;

                try {
                    const decoded = TokenHelper.verifyToken(token);
                    if (decoded && decoded.id) {
                        const user = await User.findByPk(decoded.id);
                        if (user) {
                            const userRole = await UserRole.findOne({
                                where: { userId: user.id },
                                include: [{ model: Role, as: 'role' }],
                            });
                            const role = userRole?.role?.name;

                            response = JSON.stringify({ user, role, correlationId });
                        } else {
                            response = JSON.stringify({ error: 'User not found.', correlationId });
                        }
                    } else {
                        response = JSON.stringify({ error: 'Invalid token.', correlationId });
                    }
                } catch (error) {
                    response = JSON.stringify({ error: 'Token verification failed.', correlationId });
                }

                await RabbitMQHelper.sendMessage('verify_token_response_queue', response);
            }
        });
    }
}

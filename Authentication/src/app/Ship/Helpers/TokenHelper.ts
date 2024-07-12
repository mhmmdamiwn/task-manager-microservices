import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
    id: number;
    email: string;
    role?: string; // Optional role property in the token payload
}

export class TokenHelper {
    public static generateToken(user: TokenPayload, expiresIn: string = '1h'): string {
        const payload: TokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role, // Assuming user.role contains the role name or ID
        };
        return jwt.sign(payload, 'secretKey', { expiresIn });
    }
    public static verifyToken(token: string): JwtPayload | null {
        console.log('token to verify', token)
        try {
            const decoded = jwt.verify(token, 'secretKey');
            return decoded as JwtPayload; // Type assertion to JwtPayload
        } catch (error) {
            return null;
        }
    }
}

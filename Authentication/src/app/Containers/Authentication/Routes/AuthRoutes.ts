import { Router } from 'express';
import { AuthController, verifyLoginToken } from '../Controllers/AuthController';
import { validateRegister, validateLogin } from '../Middlewares/Validators';

const router = Router();

// POST /auth/register - Register a new user
router.post('/register', validateRegister, AuthController.register);

// POST /auth/login - Authenticate user and return JWT
router.post('/login', validateLogin, verifyLoginToken);

export default router;

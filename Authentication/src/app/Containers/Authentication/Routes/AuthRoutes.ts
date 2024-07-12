import { Router } from 'express';
import { AuthController } from '../Controllers/AuthController';
import { validateRegister, validateLogin } from '../Middlewares/Validators';
import { ControllerHandler } from '../../../Ship/Handlers/ControllerHandler';

const router = Router();

// POST /auth/register - Register a new user
router.post('/register', validateRegister, ControllerHandler(AuthController.register));

// POST /auth/login - Authenticate user and return JWT
router.post('/login', validateLogin, ControllerHandler(AuthController.login));

export default router;

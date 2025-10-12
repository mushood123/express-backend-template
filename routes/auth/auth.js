import { Router } from 'express';
import { AuthController } from '../../controllers/index.js';

const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);

AuthRouter.post('/sign-up', AuthController.register);

AuthRouter.post('/forgot-password', AuthController.forgotPassword);

AuthRouter.post('/reset-password', AuthController.resetPassword);

AuthRouter.post('/verify-otp', AuthController.verifyOtp);

AuthRouter.post('/resend-otp', AuthController.resendOtp);

AuthRouter.post('/logout', (req, res) => {
  res.send('Logout endpoint not implemented yet.');
});

export { AuthRouter };

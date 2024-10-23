import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.createUser);
router.get('/activate', AuthController.activateUser);
router.get('/resend/activation', AuthController.requestNewActivationMail);

export default router;

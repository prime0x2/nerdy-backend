import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.createUser);
router.get('/activate', AuthController.activateUser);

export default router;

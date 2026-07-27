import { Router } from 'express';
import { Login, Logout, Refresh, Register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/refresh', Refresh);
router.post('/logout', Logout);

export default router;

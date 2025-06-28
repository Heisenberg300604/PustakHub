import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();

// public routes
router.post('/register', register);
router.post('/login', login);

// private routes
router.get('/me', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;
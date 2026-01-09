import express from 'express';
import { getSignup, postSignup, getLogin, postLogin, logout } from '../controllers/authController.js';
import { isGuest } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 'isGuest' prevents logged-in users from seeing login/signup pages again
router.get('/signup', isGuest, getSignup);
router.post('/signup', isGuest, postSignup);

router.get('/login', isGuest, getLogin);
router.post('/login', isGuest, postLogin);

router.get('/logout', logout);

export default router;
import express from 'express';
import { getEmployeeDashboard, applyLeave, getAdminDashboard, updateLeaveStatus } from '../controllers/leaveController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Employee Routes
router.get('/dashboard', isAuthenticated, getEmployeeDashboard);
router.post('/apply-leave', isAuthenticated, applyLeave);

// Admin Routes
router.get('/admin/dashboard', isAuthenticated, isAdmin, getAdminDashboard);
router.post('/leave/:id/status', isAuthenticated, isAdmin, updateLeaveStatus);

export default router;
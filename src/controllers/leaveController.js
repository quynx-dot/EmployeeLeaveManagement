import Leave from '../models/Leave.js';

export const getEmployeeDashboard = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.session.user.id }).sort({ appliedAt: -1 });
        res.render('employeeDashboard', { leaves });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};

export const applyLeave = async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    try {
        await Leave.create({
            user: req.session.user.id,
            username: req.session.user.username,
            startDate,
            endDate,
            reason
        });
        req.flash('success_msg', 'Leave applied successfully');
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error applying for leave');
        res.redirect('/dashboard');
    }
};

export const getAdminDashboard = async (req, res) => {
    try {
        const leaves = await Leave.find().sort({ appliedAt: -1 });
        res.render('adminDashboard', { leaves });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};

export const updateLeaveStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await Leave.findByIdAndUpdate(id, { status });
        req.flash('success_msg', 'Leave status updated');
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/admin/dashboard');
    }
};
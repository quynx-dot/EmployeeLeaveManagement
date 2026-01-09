import Leave from '../models/Leave.js';

export const getEmployeeDashboard = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.session.user.id }).sort({ appliedAt: -1 });
        res.render('employeeDashboard', { 
            title: 'Dashboard', 
            user: req.session.user, 
            leaves 
        });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};

export const applyLeave = async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0,0,0,0); 

        if (end < start) {
            req.flash('error_msg', 'Invalid Date: End date cannot be before the start date.');
            return res.redirect('/dashboard');
        }

        if (start < today) {
            req.flash('error_msg', 'Invalid Date: You cannot apply for leave in the past.');
            return res.redirect('/dashboard');
        }

        await Leave.create({
            user: req.session.user.id,
            username: req.session.user.username,
            startDate,
            endDate,
            reason
        });
        
        req.flash('success_msg', 'Leave application submitted successfully');
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error applying for leave');
        res.redirect('/dashboard');
    }
};

export const getAdminDashboard = async (req, res) => {
    try {
   
        const page = parseInt(req.query.page) || 1;
        const limit = 5; 
        const skip = (page - 1) * limit;

        const { status } = req.query; 
        let query = {};
        if (status && status !== 'All') {
            query.status = status;
        }

        const totalLeaves = await Leave.countDocuments(query);
        const leaves = await Leave.find(query)
                                  .sort({ appliedAt: -1 })
                                  .skip(skip)
                                  .limit(limit);

        res.render('adminDashboard', { 
            title: 'Admin Panel', 
            user: req.session.user, 
            leaves,
            currentPage: page,
            totalPages: Math.ceil(totalLeaves / limit),
            currentStatus: status || 'All' 
        });
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
        req.flash('success_msg', `Leave request ${status}`);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/admin/dashboard');
    }
};
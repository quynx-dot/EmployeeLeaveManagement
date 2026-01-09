import Leave from '../models/Leave.js';
import User from '../models/User.js'; 
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth:{
        user: 'your-email@gmail.com', 
        pass: 'your-app-password'      
    }
});

const sendStatusEmail = async (userEmail, userName, status) => {
    try {
        await transporter.sendMail({
            from: '"Leave System" <no-reply@leavesystem.com>',
            to: userEmail,
            subject: `Leave Request Update: ${status}`,
            text: `Hello ${userName},\n\nYour leave request has been ${status}.\n\nRegards,\nAdmin Team`
        });
        console.log(`Email sent to ${userEmail}`);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

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

        const { status, search } = req.query; // Get search query
        
        let query = {};

        if (status && status !== 'All') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } }, // Case-insensitive
                { reason: { $regex: search, $options: 'i' } }
            ];
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
            currentStatus: status || 'All',
            searchTerm: search || '' 
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
      
        const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true }).populate('user');
        
        if (leave && leave.user && leave.user.email) {
         
            await sendStatusEmail(leave.user.email, leave.username, status);
        }

        req.flash('success_msg', `Leave request ${status} and email notification sent.`);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/admin/dashboard');
    }
};
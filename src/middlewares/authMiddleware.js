// Ensure user is logged in
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/login');
};

// Ensure user is Admin
export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error_msg', 'Access denied. Admins only.');
    res.redirect('/dashboard');
};

// Prevent logged-in users from visiting Login/Signup pages
export const isGuest = (req, res, next) => {
    if (req.session.user) {
        // If already logged in, redirect to their respective dashboard
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        }
        return res.redirect('/dashboard');
    }
    next();
};
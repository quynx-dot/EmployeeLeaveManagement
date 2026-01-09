import User from '../models/User.js';

export const getSignup = (req, res) => res.render('signup', { title: 'Signup' });
export const getLogin = (req, res) => res.render('login', { title: 'Login' });

export const postSignup = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            req.flash('error_msg', 'Username already exists');
            return res.redirect('/signup');
        }
        // NOTE: For this assignment, we allow selecting role in the form.
        await User.create({ username, password, role });
        req.flash('success_msg', 'Registration successful! You can now log in.');
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error registering user');
        res.redirect('/signup');
    }
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            req.session.user = { id: user._id, username: user.username, role: user.role };
            
            // Redirect based on Role
            if (user.role === 'admin') return res.redirect('/admin/dashboard');
            return res.redirect('/dashboard');
        } else {
            req.flash('error_msg', 'Invalid Credentials');
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/login');
    });
};
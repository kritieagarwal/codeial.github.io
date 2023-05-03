const User = require('../models/users');


module.exports.profile = function (req, res) {
    User.findById(req.params.id)
        .then(user => {
            return res.render('user_profile', {
                title: "User Profile",
                profile_user: user
            });
        });

}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(user => {
                return res.redirect('back');
            });
    }
    else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.posts = function (req, res) {
    // res.end('<h1>Posts</h1>');
    return res.render('users', {
        title: "posts"
    });
}

// render sign-up page
module.exports.signup = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render sign-in page
module.exports.signin = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                User.create(req.body)
                    .then(user => res.redirect('/users/sign-in'))
                    .catch(err => {
                        console.log('error in creating user while signing up', err);
                    });
            } else {
                res.redirect('back');
            }
        })
        .catch(err => {
            console.log('error in finding user in signing up', err);
        });


}

// sign-in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return;
        }

        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
}
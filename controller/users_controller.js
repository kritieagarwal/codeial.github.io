const User = require('../models/users');


module.exports.profile = function (req, res) {
    // res.end('<h1>User Profile</h1>');
    return res.render('users', {
        title: "profile"
    });
}

module.exports.posts = function (req, res) {
    // res.end('<h1>Posts</h1>');
    return res.render('users', {
        title: "posts"
    });
}

// render sign-up page
module.exports.signup = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render sign-in page
module.exports.signin = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    // User.findOne({ email: req.body.email }, function (err, user) {
    //     if (err) { console.log('error in finding user in signing up'); return }

    //     if (!user) {
    //         User.create(req.body, function (err, user) {
    //             if (err) { console.log('error in creating user while signing up'); return }

    //             return res.redirect('/users/sign-in');
    //         })
    //     }
    //     else {
    //         return res.redirect('back');
    //     }

    // })

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
    // todo later
}
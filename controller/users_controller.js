const User = require('../models/users');
const { use } = require('../routes/users');


// module.exports.profile = function (req, res) {
//     if (req.cookies.user_id) {
//         User.findById(req.cookies.user_id)
//             .then(user => {
//                 if (user) {
//                     return res.render('users', {
//                         title: 'User Profile',
//                         user: user,
//                     })
//                 }
//                 else {
//                     return res.redirect('/users/sign-in');
//                 }
//             });
//     }
//     else {
//         return res.redirect('/users/sign-in');
//     }
// }

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id)
            .then(user => {
                if (user) {
                    return res.render('users', {
                        title: 'User Profile',
                        user: user,
                    })
                }
                else {
                    return res.redirect('/users/sign-in');
                }
            })
            .catch(err => {
                console.log(err);
                return res.redirect('/users/sign-in');
            });
    }
    else {
        return res.redirect('/users/sign-in');
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

    // steps to authenticate
    // find the user

    User.findOne({ email: req.body.email })
        .then(user => {

            if (user) {
                // handle password that doesn't match
                if (user.password != req.body.password) {
                    return res.redirect('back');
                }

                // handle session creation
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');

                // handle user not found

            }
            else {
                return res.redirect('back');
            }

        })
        .catch(err => {
            console.log('error in finding user in signing in', err);
        });
}

// module.exports.delete = function (req, res) {
//     if (req.cookies.user_id) {
//         res.clearCookie('user_id');
//         res.redirect('/users/sign-in');
//     }
//     else {
//         res.redirect('back');
//     }
// }
const Post = require('../models/post');

module.exports.home = function (req, res) {

    Post.find({}).populate('user')
        .then(post => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: post
            });
        })
        .catch(err => {
            console.log(err);
        });

}
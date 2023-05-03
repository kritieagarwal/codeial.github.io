const Post = require('../models/post');

module.exports.home = function (req, res) {

    // Post.find({}).populate('user').exec()
    //     .then(post => {
    //         return res.render('home', {
    //             title: "Codeial | Home",
    //             posts: post
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err); 
    //     });

    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec()
        .then(posts => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts
            });
        });

}
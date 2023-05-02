const Comment = require('../models/comment');
const Post = require('../models/post');

// module.exports.create = function (req, res) {
//     Post.findById(req.body.post)
//         .then(post => {
//             if (post) {
//                 return Comment.create({
//                     content: req.body.content,
//                     post: req.body.post,
//                     user: req.user._id
//                 });
//             }

//         .then(comment => {
//             if (comment) {
//                 post.comments.push(comment);
//                 return post.save();
//             }
//         })
//         .then(() => {
//             res.redirect('/');
//         })
//         .catch(err => {
//             console.log(err);
//             // handle error
//             res.status(500).send('Error creating comment');
//         });
// }

module.exports.create = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                    .then(comment => {
                        post.comments.push(comment);
                        post.save();
                        res.redirect('/');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
}
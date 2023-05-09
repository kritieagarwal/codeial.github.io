const Post = require('../models/post');
const User = require('../models/users');


module.exports.home = async function (req, res) {

    try {
        // populate the user of each post
        let posts = await Post.find({})
            // to sort posts in reverse chronological order
            // -createdAt is how data is saved in mongodb
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                // for comment
                populate: {
                    path: 'likes'
                }
                // for post
            }).populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch (err) {
        console.log('Error', err);
        return;
    }


}
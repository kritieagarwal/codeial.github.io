const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // user who sent the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // user who accepted the request, naming is only for understanding, users won't see any difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;
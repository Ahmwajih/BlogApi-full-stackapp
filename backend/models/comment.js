const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    time_stamp: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }},
    {
        timestamps: true,
        collection: 'comments'
    });
    

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
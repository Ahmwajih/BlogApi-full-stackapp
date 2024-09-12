const mongoose = require('mongoose');

const postViewRecordSchema = new mongoose.Schema({
    time_stamp: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'},
    
    },
    {
        timestamps: true,
        collection: 'postViewRecords'
    });

const PostViewRecord = mongoose.model('PostViewRecord', postViewRecordSchema);

module.exports = PostViewRecord;
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true,
    collection: 'likes'
});

const Like = mongoose.model('Like', likeSchema);
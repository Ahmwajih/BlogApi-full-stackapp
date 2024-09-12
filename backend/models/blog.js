const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    published_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        trim: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    collection: 'blogs'
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

// blog test with postman 
// {
//     "title": "Test blog",
//     "content": "This is a test blog",
//     "image": "test.jpg",
//     "slug": "test-blog",
//     "status": "draft",
//     "category": "5f8b5f5e3b5b5b1d4c6e2c7e",
//     "author": "5f8b5f5e3b5b5b1d4c6e2c7e"
// }


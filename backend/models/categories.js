const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'categories'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

// blog test with postman 

// {
//     "name": "Test category"
// }

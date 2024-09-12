const mongoose = require('mongoose');

const profileSchema = new Schema({
    image: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    collection: 'profiles'
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;


// blog test with postman 

// {
//     "image": "image.jpg",
//     "address": "test address",
//     "user": "5f8b5f5e3b5b5b1d4c6e2c7e"
// }

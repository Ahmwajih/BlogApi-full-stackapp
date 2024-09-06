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
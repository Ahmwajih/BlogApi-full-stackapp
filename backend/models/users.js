const mongoose = require('mongoose');
const pwEncrypt = require('../helpers/pwEncrypt');

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String,
        required: true,
        trim: true
    },
    last_name: { 
        type: String,
        required: true,
        trim: true
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: { 
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(v);
            },
            message: props => `${props.value} is not a valid password`
        }
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, {
    timestamps: true,
    collection: 'users'
});

// Pre-save hook to encrypt the password before saving
userSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = pwEncrypt(this.password);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
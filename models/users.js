const mongoose = require('mongoose');

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
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
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
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password`
        },
        set: function(pw) {
            return pwEncrypt(pw);
        }
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }},
    {
        timestamps: true,
        collection: 'users'
    });


const User = mongoose.model('User', userSchema);
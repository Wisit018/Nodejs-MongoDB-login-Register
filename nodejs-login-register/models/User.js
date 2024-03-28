const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    }
})
    
UserSchema.pre('save' , function(next) {
    const user = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    }).catch(err => {
        console.log(`Error : ${err}`);
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
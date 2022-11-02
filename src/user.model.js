// Source: https://buddy.works/tutorials/testing-with-jest-password-authentication-in-mongoose-model

const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "username is required"
    },
    email: {
        type: String,
        unique: 'email already exists',
        match: [/. +\@. +\.. + /, 'Please give a valid email address']
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String
});

UserSchema.statics.generateSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
}

UserSchema.statics.generateHash = function(password, salt) {
    try {
        const hmac = crypto.createHmac('sha1', salt);
        hmac.update(password);
        return hmac.digest('hex');
    } catch(err) {
        return err;
    }
}

UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.model('User').generateSalt();
    this.hashed_password = this.model('User').generateHash(password, this.salt);
}).get(function(){
    return this._password;
});

UserSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 16) {
        this.invalidate('password', 'Password must be at least 16 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required.');
    }
    if (this._password && /\d/.test(this._password) === false) {
        this.invalidate('password', 'Password must contain numbers.');
    }
    if (this._password && /[a-zA-Z]/.test(this._password) === false) {
        this.invalidate('password', 'Password must contain letters.');
    }
    if (this._password && /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._password) === false) {
        this.invalidate('password', 'Password must contain special characters.');
    }
    if (this._password && this._password.startsWith(/\d/) === true) {
        this.invalidate('password', 'Password cannot start with a number.');
    }
    if (this._password && this._password.startsWith(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) === true) {
        this.invalidate('password', 'Password cannot start with a special character.');
    }
}, null);

module.exports = mongoose.model('User', UserSchema);
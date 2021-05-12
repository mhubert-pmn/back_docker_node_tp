const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
    email: {
        type: String,
        required: "L'email est requis",
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const saltRounds = 10;

userSchema.pre("save", function(next) {
    let user = this;

// hash le password s'il est nouveau ou modifié
if (!user.isModified('password')) return next();

// génération du salt
bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    // hash le password avec le salt généré précédemment
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // remplace le password par le password hash
        user.password = hash;
        next();
    });
});
});

module.exports = mongoose.model('User', userSchema);
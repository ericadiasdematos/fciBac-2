var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    genre: String,
    nom: String,
    prenom: String,
    email: String,
    telephone: Number,
    password: String,
    salt: String,
    token: String

})

var userModel = mongoose.model('users', userSchema);

module.exports = userModel


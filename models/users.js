var mongoose = require('mongoose');

var rechercheSchema = mongoose.Schema({
    localisation: String,
    mapBounds: Array,
    budgetMin: String,
    budgetMax: String,
    typeDeBien: Array,
    typeDeTransaction: String,
    surfaceMin: String,
    surfaceMax: String,
    terrainMin: String,
    terrainMax: String,
    nbPieces: String,
    nbChambres: String,
    date: String

})

var userSchema = mongoose.Schema({
    type: String,
    genre: String,
    nom: String,
    prenom: String,
    email: String,
    telephone: Number,
    password: String,
    agence: String,
    salt: String,
    token: String,
    biensFavoris : [{ type: mongoose.Schema.Types.ObjectId, ref: 'biens' }],
    recherches : [rechercheSchema]

})

var userModel = mongoose.model('users', userSchema);

module.exports = userModel


var mongoose = require('mongoose');

var bienSchema = mongoose.Schema({
    reference: String,
    status: String,
    typeBien: String,
    date: String,
    agency: String,
    typeTransaction: String,
    typeDachat: String,
    anneeDeConstruction: String,
    etages: String,
    latitude: Number,
    longitude: Number,
    adresse: String,
    codePostal: String,
    ville: String,
    pays: String,
    exposition: String,
    vue: String,
    rdc: String,
    dernierEtage: String,
    distanceTrain: String,
    accesBus: String,
    accesMetro: String,
    accesTram: String,
    accesEcole: String,
    prixBien: String,
    prixM2: String,
    taxeFonciere: String,
    prixDepart: String,
    honoAcquereur: String,
    copro: String,
    chargesAnuelles: String,
    nbLots: String,
    nbLotsHabitation: String,
    proceduresCopro: String,
    nbPieces: String,
    nbChambres: String,
    mecaChauffage: String,
    chambreRdc: String,
    eauChaude: String,
    terrasseBoolean: String,
    balconBoolean: String,
    jardinBoolean: String,
    jardin: String,
    piscineBoolean: String,
    visAvis: String,
    surfaceTotal: String,
    surfaceTerrain: String,
    surfacePiece: String,
    gazEffetSerre: String,
    valeurGazSerre: String,
    valeurConsoAnnuelle: String,
    description: String,
    autres: String,
    photos: Array



})

var bienModel = mongoose.model('biens', bienSchema);

module.exports = bienModel
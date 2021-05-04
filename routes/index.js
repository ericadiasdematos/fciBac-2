var express = require('express');
var router = express.Router();
var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var userModel = require('../models/users')
var bienModel = require('../models/biens')
var axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
// var parseString = require('xml2js').parseString;
const htmlparser = require("htmlparser2");
const parser = new xml2js.Parser({ attrkey: "ATTR" });
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});




router.post('/signUp', async function(req, res, next) {


  var errors = [];
  var result = false;

  var userEmails = await userModel.find({email: req.body.emailFromFront})

  if(userEmails.length != 0){

    errors.push('Cet e-mail est déjà utilisé')
  }

  if (req.body.genreFromFront == '' ||
      req.body.nomFromFront == '' ||
      req.body.prenomFromFront == '' ||
      req.body.emailFromFront == '' ||
      req.body.telephoneFromFront == '' ||
      req.body.passwordFromFront == ''||
      req.body.passwordConfirmationFromFront == '' ){

        errors.push('Champs vides')
      }

  if(req.body.passwordFromFront != req.body.passwordConfirmationFromFront){
    errors.push('Les mots de passe ne sont pas identiques')
  }

  if(isNaN(req.body.telephoneFromFront)){
    errors.push('Insérer un numéro de téléphone valide')
  }


  if(errors.length == 0){

    var usersalt = uid2(32);
    console.log('user salt and password:',usersalt, req.body.passwordFromFront)
    console.log('crypted pass:', SHA256(req.body.passwordFromFront + usersalt).toString(encBase64))

    var newUser = new userModel({
      type: "user",
      genre: req.body.genreFromFront,
      nom: req.body.nomFromFront,
      prenom: req.body.prenomFromFront,
      email: req.body.emailFromFront,
      telephone: req.body.telephoneFromFront,
      salt: usersalt,
      password: SHA256(req.body.passwordFromFront + usersalt).toString(encBase64),
      token: uid2(32),
    })

    console.log('user:', newUser)
      
    var userSaved = await newUser.save()


    if(userSaved){
      result = true;
    }

  }

  res.json({result, errors})
});

router.post('/signIn', async function(req, res, next) {
   
  console.log('pass back:', req.body.passwordFromFront)

  var result = false;
  var errors = [];
  var token = null
  var usersName = null
  var userType = null

  if(req.body.emailFromFront === "" || req.body.passwordFromFront === ""){
    errors.push('Champs vides')
  }

  var findUser = await userModel.findOne({email: req.body.emailFromFront})



  // console.log('userPassBDD: ',findUser.password)
  // console.log('hash: ',SHA256(req.body.passwordFromFront + findUser.salt).toString(encBase64))

  if(findUser){
    usersName = findUser.prenom;
    userType = findUser.type
    var hash = SHA256(req.body.passwordFromFront + findUser.salt).toString(encBase64);
      if(findUser.password == hash){
        result = true;
        token = findUser.token
      }else{
        errors.push('Password incorrecte')
      }
  }else{
    errors.push('Email incorrecte')
  }

  

  res.json({result, errors, token, usersName, userType })
});

router.post('/sendToken', async function(req, res, next) {

  var result = false
  var user = null

  console.log('token:',req.body.tokenFromFront)

  var findUser = await userModel.findOne({token: req.body.tokenFromFront})

  if(findUser){
    result = true
    user = findUser
  }

  // console.log('result:', result, 'user:', user)


  res.json({result, user})
});

router.post('/createBien', async function(req, res, next) {
  console.log("latitudeFromFront :", req.body.latitudeFromFront,"longitudeFromFront :",  req.body.longitudeFromFront)
  var result = false
  var bien = null

  console.log(    "piscine:", req.body.piscineFromFront,
                  "balcon:", req.body.balconFromFront,
                  "terrasse:",  req.body.terrasseFromFront)

  var newBien = new bienModel({
    reference: req.body.refFromFront,
    status: req.body.statusFromFront,
    date: req.body.dateFromFront,
    typeBien: req.body.typeFromFront,
    agency: req.body.agenceFromFront,
    typeTransaction: req.body.trasactionFromFront,
    typeDachat: req.body.typeDachatFromFront,
    anneeDeConstruction: req.body.anneeDeConstructionFromFront,
    latitude: req.body.latitudeFromFront,
    longitude: req.body.longitudeFromFront,
    adresse: req.body.adressFromFront,
    codePostal: req.body.codeFromFront,
    ville: req.body.cityFromFront,
    pays: req.body.countryFromFront,
    exposition: req.body.expositionFromFront,
    vue: req.body.viewFromFront,
    rdc: req.body.firstFloorFromFront,
    dernierEtage: req.body.lastFloorFromFront,
    distanceTrain: req.body.trainFromFront,
    accesBus: req.body.busFromFront,
    accesMetro: req.body.metroFromFront,
    accesTram: req.body.tramFromFront,
    accesEcole: req.body.schoolFromFront,
    prixBien: req.body.priceFromFront,
    prixM2: req.body.prixMFromFront,
    taxeFonciere: req.body.taxFonciereFromFront,
    prixDepart: req.body.prixDepartFromFront,
    honoAcquereur: req.body.honorairesFromFront,
    copro: req.body.coproprieteFromFront,
    chargesAnuelles: req.body.priceYearFromFront,
    nbLots: req.body.nLotsFromFront,
    nbLotsHabitation: req.body.lotHabFromFront,
    proceduresCopro: req.body.proceduresFromFront,
    nbPieces: req.body.roomsFromFront,
    nbChambres: req.body.nbChambresFromFront,
    etages: req.body.etagesFromFront,
    mecaChauffage: req.body.heatFromFront,
    chambreRdc: req.body.firstFloorRoomFromFront,
    eauChaude: req.body.waterFromFront,
    jardinBoolean: req.body.jardinBooleanFromFront,
    jardin: req.body.gardenFromFront,
    piscine: req.body.piscineFromFront,
    balcon: req.body.balconFromFront,
    terrasse: req.body.terrasseFromFront,
    visAvis: req.body.buildingViewFromFront,
    surfaceTotal: req.body.totalMFromFront,
    surfaceTerrain: req.body.surfaceTerrainFromFront,
    surfacePiece: req.body.eachRoomFromFront,
    gazEffetSerre: req.body.gasEffectFromFront,
    valeurGazSerre: req.body.gasValueFromFront,
    valeurConsoAnnuelle: req.body.consoFromFront,
    description: req.body.descriptionFromFront,
    autres: req.body.otherFromFront,
    photos: req.body.photoFromFront
  })


  var bienSaved = await newBien.save()

  if(bienSaved){
    result = true
}
  
  res.json({result})
})

router.post('/getBiens', async function(req, res, next) {

  var biens = await bienModel.find()


  res.json({biens})
})


router.post('/editBien', async function(req, res, next) {

  console.log(    "piscine:", req.body.piscineFromFront,
                  "balcon:", req.body.balconFromFront,
                  "terrasse:",  req.body.terrasseFromFront)
  var result = false

  var bien = await bienModel.updateOne(
    {_id: req.body.idFromFront},
    {
      reference: req.body.refFromFront,
      status: req.body.statusFromFront,
      date: req.body.dateFromFront,
      typeBien: req.body.typeFromFront,
      agency: req.body.agenceFromFront,
      typeTransaction: req.body.trasactionFromFront,
      typeDachat: req.body.typeDachatFromFront,
      anneeDeConstruction: req.body.anneeDeConstructionFromFront,
      latitude: req.body.latitudeFromFront,
      longitude: req.body.longitudeFromFront,
      adresse: req.body.adressFromFront,
      codePostal: req.body.codeFromFront,
      ville: req.body.cityFromFront,
      pays: req.body.countryFromFront,
      exposition: req.body.expositionFromFront,
      vue: req.body.viewFromFront,
      rdc: req.body.firstFloorFromFront,
      dernierEtage: req.body.lastFloorFromFront,
      distanceTrain: req.body.trainFromFront,
      accesBus: req.body.busFromFront,
      accesMetro: req.body.metroFromFront,
      accesTram: req.body.tramFromFront,
      accesEcole: req.body.schoolFromFront,
      prixBien: req.body.priceFromFront,
      prixM2: req.body.prixMFromFront,
      taxeFonciere: req.body.taxFonciereFromFront,
      prixDepart: req.body.prixDepartFromFront,
      honoAcquereur: req.body.honorairesFromFront,
      copro: req.body.coproprieteFromFront,
      chargesAnuelles: req.body.priceYearFromFront,
      nbLots: req.body.nLotsFromFront,
      nbLotsHabitation: req.body.lotHabFromFront,
      proceduresCopro: req.body.proceduresFromFront,
      nbPieces: req.body.roomsFromFront,
      nbChambres: req.body.nbChambresFromFront,
      etages: req.body.etagesFromFront,
      mecaChauffage: req.body.heatFromFront,
      chambreRdc: req.body.firstFloorRoomFromFront,
      eauChaude: req.body.waterFromFront,
      jardinBoolean: req.body.jardinBooleanFromFront,
      jardin: req.body.gardenFromFront,
      piscine: req.body.piscineFromFront,
      balcon: req.body.balconFromFront,
      terrasse: req.body.terrasseFromFront,
      visAvis: req.body.buildingViewFromFront,
      surfaceTotal: req.body.totalMFromFront,
      surfaceTerrain: req.body.surfaceTerrainFromFront,
      surfacePiece: req.body.eachRoomFromFront,
      gazEffetSerre: req.body.gasEffectFromFront,
      valeurGazSerre: req.body.gasValueFromFront,
      valeurConsoAnnuelle: req.body.consoFromFront,
      description: req.body.descriptionFromFront,
      autres: req.body.otherFromFront,
      photos: req.body.photoFromFront
    }
  )

  if(bien){
    result = true
  }
 
  res.json({result})
})


router.post('/saveAdmin', async function(req, res, next) {


 var errors = [];
  var result = false;


  if (req.body.genreFromFront == '' ||
      req.body.nomFromFront == '' ||
      req.body.prenomFromFront == '' ||
      req.body.emailFromFront == '' ||
      req.body.telFromFront == '' ||
      req.body.passwordFromFront == '' ||
      req.body.agenceFromFront == ''){

        errors.push('Champs vides')
      }


  if(isNaN(req.body.telFromFront)){
    errors.push('Insérer un numéro de téléphone valide')
  }


  if(errors.length == 0){

    var usersalt = uid2(32);
    console.log('user salt and password:',usersalt, req.body.passwordFromFront)
    console.log('crypted pass:', SHA256(req.body.passwordFromFront + usersalt).toString(encBase64))

    var newUser = new userModel({
      type: "admin",
      genre: req.body.genreFromFront,
      nom: req.body.nomFromFront,
      prenom: req.body.prenomFromFront,
      email: req.body.emailFromFront,
      telephone: req.body.telFromFront,
      agence: req.body.agenceFromFront,
      salt: usersalt,
      password: SHA256(req.body.passwordFromFront + usersalt).toString(encBase64),
      token: uid2(32),
    })

    console.log('user:', newUser)
      
    var userSaved = await newUser.save()


    if(userSaved){
      result = true;
    }

  }

  res.json({result, errors})
})

router.get('/getAdmins', async function(req, res, next) {

 
var adminUsers = await userModel.find({
  type:"admin"
})
console.log("adminUsers :", adminUsers)

 
res.json({adminUsers})
 })

router.delete('/deleteAdmin', async function(req, res, next) {

  var result = false;
   
  var deleteAdmin = await userModel.findOneAndRemove({
    _id: req.body.idFromFront
  })

  var adminUsers = await userModel.find({
    type:"admin"
  })

  
   
  res.json({adminUsers})
   })


router.delete('/supprimerBien', async function(req, res, next) {

  console.log("id :", req.body.idFromFront)

  var result = false;

 var deleteBien = await bienModel.deleteOne(
   {_id: ObjectId(req.body.idFromFront) }
   )

 if(deleteBien){
   result =  true
 }
 
   res.json({result})
 })


 
router.post('/getBiens', async function(req, res, next) {

  var filters = req.body.filtersFromFront

  var allBiens = await bienModel.find();
  // console.log("allBiens", allBiens[0])
 
  res.json({allBiens})
})


router.post('/addBienToFavoris', async function(req, res, next) {
  var result = false
  var bien = null

  console.log("userTokenFromFront :", req.body.userTokenFromFront, "bienIdFromFront :", req.body.bienIdFromFront)

  // var userFoundByToken = await userModel.find({})

  var user = await userModel.findOneAndUpdate(
    {token: req.body.userTokenFromFront},
    { $push: { biensFavoris: req.body.bienIdFromFront } }
  )

  mongoose.set('useFindAndModify', false);

  if(user){
    result = true
    console.log(result)
  }
  
  res.json({})
})

router.post('/getBiensFavoris', async function(req, res, next) {

 var user = await userModel.findOne(
   {token: req.body.userTokenFromFront})
   .populate('biensFavoris')
   .exec();
   
  //  console.log("biensFavoris :", user.biensFavoris)

   var tableauDeBiensFavoris = user.biensFavoris


   res.json({tableauDeBiensFavoris})
  })

  router.delete('/supprimerBienFavori', async function(req, res, next) {

    var result = false

    var deleteBienFavori = await userModel.updateOne({ token: req.body.userTokenFromFront }, { $pull: { biensFavoris: req.body.idFromFront } });
    if(deleteBienFavori){
      result = true
    }

    var user = await userModel.findOne(
      {token: req.body.userTokenFromFront})
      .populate('biensFavoris')
      .exec();
         
    var tableauDeBiensFavoris = user.biensFavoris

     res.json({result, tableauDeBiensFavoris})
   })

   router.post('/checkIfBienIsInWishlist', async function(req, res, next) {

    var user = await userModel.findOne(
      {token: req.body.userTokenFromFront})
         
      var tableauDeBiensFavoris = user.biensFavoris
      var includesBien = tableauDeBiensFavoris.includes(req.body.idFromFront)

      console.log("includesBien :", includesBien)
   
   
      res.json({includesBien})
     })

  router.post('/addFiltersInRecherches', async function(req, res, next) {

    var noEndroitOrMap = false;
    var noBudget = false;
    var noTypeDeBien = false;

    if(req.body.filtersFromFront.endroit === '' && req.body.filtersFromFront.mapBounds.length === 0){
      noEndroitOrMap =  true
    }
    if(req.body.filtersFromFront.prixMin === '' && req.body.filtersFromFront.prixMax === ''){
      noBudget = true
    }
    if(req.body.filtersFromFront.noBiensSelected === true){
      noTypeDeBien = true
    }
        
    if( noEndroitOrMap === true &&
        noBudget === true &&
        noTypeDeBien === true){

      console.log("not enough data to store")

    }else{

      var endroit = req.body.filtersFromFront.endroit.label
      var typeDeBien = []
      if(req.body.filtersFromFront.appartement === true){
        typeDeBien.push("Appartement")
      }
      if(req.body.filtersFromFront.maison === true){
        typeDeBien.push("Maison")
      }
      if(req.body.filtersFromFront.loft === true){
        typeDeBien.push("Loft")
      }
      if(req.body.filtersFromFront.bureau === true){
        typeDeBien.push("Bureau")
      }
      if(req.body.filtersFromFront.hotelP === true){
        typeDeBien.push("Hotel Particulier")
      }
      if(req.body.filtersFromFront.immeuble === true){
        typeDeBien.push("Immeuble")
      }
      if(req.body.filtersFromFront.parking === true){
        typeDeBien.push("Parking / Box")
      }
      if(req.body.filtersFromFront.fondCommerce === true){
        typeDeBien.push("Fond de Commerce")
      }
      if(req.body.filtersFromFront.terrain === true){
        typeDeBien.push("Terrain")
      }
      if(req.body.filtersFromFront.noBiensSelected === true){
        typeDeBien.push("Vous n'avez pas séléctionné un type de bien")
      }
  
      var today = new Date();
  
  
      var user = await userModel.findOne(
        {token: req.body.tokenFromFront}
      )
  
  
      user.recherches.push({
        localisation: endroit,
        mapBounds: req.body.filtersFromFront.mapBounds,
        budgetMin: req.body.filtersFromFront.prixMin,
        budgetMax: req.body.filtersFromFront.prixMax,
        typeDeBien: typeDeBien,
        typeDeTransaction: req.body.filtersFromFront.typedeTransaction,
        surfaceMin: req.body.filtersFromFront.surfaceMinFromFront,
        surfaceMax: req.body.filtersFromFront.surfaceMaxFromFront,
        terrainMin: req.body.filtersFromFront.terrainMinFromFront,
        terrainMax: req.body.filtersFromFront.terrainMaxFromFront,
        nbPieces: req.body.filtersFromFront.nbPiecesFromFront,
        nbChambres: req.body.filtersFromFront.nbChambresFromFront,
        date: today
      })
  
      var userSaved = await user.save()
    }

    console.log(req.body.filtersFromFront)

  
  res.json()
})


router.post('/getMesRecherches', async function(req, res, next) {

  var user = await userModel.findOne(
    {token: req.body.userTokenFromFront})
       

    console.log(user.recherches)

    var tableauDeMesRecherches = user.recherches


    tableauDeMesRecherches.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()

 
 
    res.json({tableauDeMesRecherches})
   })


router.delete('/deleteMaRecherche', async function(req, res, next) {

console.log("token:", req.body.userTokenFromFront, "id :", req.body.idFromFront)

    var deleteBienFavori = await userModel.updateOne({ token: req.body.userTokenFromFront }, { $pull: { recherches: {_id: req.body.idFromFront} } });
      if(deleteBienFavori){
        result = true
      }

      var user = await userModel.findOne(
        {token: req.body.userTokenFromFront})
           
    
        console.log(user.recherches)
    
        var tableauDeMesRecherches = user.recherches
        tableauDeMesRecherches.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()

         
   
   
      res.json({tableauDeMesRecherches})
     })

module.exports = router;


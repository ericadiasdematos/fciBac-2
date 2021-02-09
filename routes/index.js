var express = require('express');
var router = express.Router();
var uid2 = require('uid2')
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var userModel = require('../models/users')


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

  if(req.body.emailFromFront === "" || req.body.passwordFromFront === ""){
    errors.push('Champs vides')
  }

  var findUser = await userModel.findOne({email: req.body.emailFromFront})



  // console.log('userPassBDD: ',findUser.password)
  // console.log('hash: ',SHA256(req.body.passwordFromFront + findUser.salt).toString(encBase64))

  if(findUser){
    usersName = findUser.prenom;
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

  

  res.json({result, errors, token, usersName })
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

  console.log('result:', result, 'user:', user)


  res.json({result, user})
});


module.exports = router;



// var result = false
// var error = []
// var token = null

// if(req.body.emailFromFront == '' || req.body.passwordFromFront == ''){
//   error.push('Champs vides')
// }

// if (error.length === 0){

//   const user = await userModel.find({email: req.body.emailFromFront})

//   console.log(user)

//   if(user){
//     var salt = 'rBmFH3f3JdoJMmbsDDyRD1BBGu5q1ycC';
//     var hash = SHA256(123 + salt).toString(encBase64)
    
//     if(user.password === SHA256(req.body.passwordFromFront + user.salt).toString(encBase64)){
//       result = true;
//       token = user.token
//     }else{
//       error.push('mot de passe incorrecte')
//     }
//   }else{
//     error.push('email incorrect')
//   }
// }

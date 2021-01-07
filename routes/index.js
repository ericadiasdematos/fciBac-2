var express = require('express');
var router = express.Router();
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
      req.body.passwordFromFront == '' ){

        errors.push('Champs vides')
      }

  if(isNaN(req.body.telephoneFromFront)){
    errors.push('Insérer un numéro de téléphone valide')
  }


  if(errors.length == 0){

    var newUser = new userModel({
      genre: req.body.genreFromFront,
      nom: req.body.nomFromFront,
      prenom: req.body.prenomFromFront,
      email: req.body.emailFromFront,
      telephone: req.body.telephoneFromFront,
      password: req.body.passwordFromFront,
    })
      
    var userSaved = await newUser.save()

    if(userSaved){
      result = true;
    }

  }

  res.json({result, errors})
});


module.exports = router;

var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useFindAndModify: false // might cause a problem
  }
  mongoose.connect('mongodb+srv://admin:30094561@cluster0.xutoc.mongodb.net/FCI?retryWrites=true&w=majority', 
      options, 
      function(err) {
       console.log(err);
      }
  );
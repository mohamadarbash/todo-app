var mongoose = require('mongoose');

var URL = process.env.PROD_MONGODB;

mongoose.Promise = global.Promise;
mongoose.connect(URL, { useNewUrlParser: true } );

module.exports = {mongoose}



/*





*/
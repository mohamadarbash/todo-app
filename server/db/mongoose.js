var mongoose = require('mongoose');

var URL = process.env.PROD_MONGODB || 'mongodb://localhost:27017/todoApp';

mongoose.Promise = global.Promise;
mongoose.connect(URL, { useNewUrlParser: true } );

module.exports = {mongoose}
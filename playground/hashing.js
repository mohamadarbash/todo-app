const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
	id: 10
};


const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, '123abc');

console.log(decoded);


var message = 'I am User'

var hash = SHA256(message).toString();

console.log(hash);
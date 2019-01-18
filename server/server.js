var env = process.env.NODE_ENV || 'development';

console.log('ENV', env)

if (env === 'development') {
	process.env.PORT = 3000;
	process.env.PROD_MONGODB = 'mongodb://localhost:27017/todoApp';
	
} else if (env === 'test') {
		process.env.PORT = 3000;
	process.env.PROD_MONGODB = 'mongodb://localhost:27017/todoAppTest'; 
}



var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
var {authenticate} = require('./middleware/authenticate');

mongoose.set('useFindAndModify', true);

var app = express();
// real server
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((docs) => {
		res.send({docs});
	}, (err) => res.status(400).send(err));
});

app.get('/todo/:id', (req, res) => {
	var id = req.params['id'];
	if(!id) {
		return res.status(404).send();
	} else {
		Todo.findById(id).then((todo) => {
			if(!todo) {
				return res.status(400).send();
			}
			res.send({todo});
	}, (e) => {
		res.status(400).send();
	});
	}
});


app.patch('/todos/:id', (req, res) => {
var id = req.params['id'];
	var body = _.pick(req.body, ['text', 'completed']);
	if (_.isBoolean(body.completed) && body.completed) {
		body['completedAt'] = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findOneAndUpdate(id, {$set: body}, {new:true})
		.then((todo) => {
			res.status(200).send({todo});
		}).catch((e) => res.status(400));
	
});


app.get('/users/me', authenticate,(req, res) => {
	res.send(req.user);
});


app.post('/users', (req, res)=> {
	var body = _.pick(req.body, ['email', 'password']);
	const user = new User(body);
	user.save().then((userDoc) => {
		return userDoc.generateAuthToken().then((token) => {
		res.header('x-auth', token).send(userDoc);
		})

	}, (e) => res.status(400).send(e));
});
















app.listen(port, () => {
	console.log('Started on Port ' + port);
});

module.exports = {app};



















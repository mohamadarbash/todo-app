var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


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
			res.send({todo});
		}).catch((e) => res.status(400));
	
});



app.listen(port, () => {
	console.log('Started on Port ' + port);
});

module.exports = {app};
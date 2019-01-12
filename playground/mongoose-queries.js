const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');


var id = '5c3268d5b821ac66f039ffee';

Todo.find({
	_id:id
}).then((todos) => {
	console.log('TODOS', todos);
});


Todo.findOne({
	_id:id
}).then((todo) => {
	console.log('TODO', todo);
});

Todo.findById(id).then((todo) => {
	console.log('TODOByID', todo);
}).catch((e) => console.log(e));
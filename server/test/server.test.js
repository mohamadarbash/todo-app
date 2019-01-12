const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{_id: new ObjectID(), text: 'mimo'},{_id: new ObjectID(), text: 'memo'}];

beforeEach( (done) => {
	Todo.deleteMany({}).then(() => {
		return Todo.insertMany(todos);		
	}).then(() => done());
});


describe('Post /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'test';
		
		request(app)
		  .post('/todos')
		  .send({text})
		  .expect(200)
		  .expect((res) => {
			  expect(res.body.text).toBe(text);
		  })
		  .end((err, res) =>  {
			 if(err){
				 return done(err);
			 }
			 Todo.find({text}).then((todos) => {
				 expect(todos.length).toBe(1);
				 expect(todos[0].text).toBe(text);
				 done();
			 }).catch((err) => done(err));
		  });
	});
	
	it('should not create todo with invaild data', (done) => {
		request(app)
		.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find().then((docs) => {
					expect(docs.length).toBe(2);
					done();
				}).catch((err) => done(err));
			})
	});
});

describe('GET /todos', () => {
	it('should fetch all todos', (done) => {
		
		request(app)
		  .get('/todos')
		  .expect(200)
		  .expect((res) => {
			  expect(res.body.docs.length).toBe(2);
		  })
		  .end(done);
	});
});






describe('GET By ID /todo/:id ', () => {

	it('should return 404 if todo not found', (done) => {
		const dummyID = new ObjectID();
		request(app)
		.get(`/todo/${dummyID.toHexString()}`)
		.expect(400)
		.end(done());
	});
/*		it('should fetch todo by ID', ( done) => {
		request(app)
				.get(`/todo/${todos[0]._id.toHexString()}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(todos[0].text)
				})
				.end(done());
	});
	*/
});
















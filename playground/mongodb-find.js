const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoAPP',  { useNewUrlParser: true } , (err, client) => {
	if(err) {
	return	console.log('Unable to connect to Db Server');
	}
	console.log('Connected to mongoDB Server');
	const db = client.db('Todos');
	
	db.collection('Todos').find({completed: true}).toArray().then( (docs) => {
		console.log('TODO');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log(err);
	});
	
		db.collection('Todos').find().count().then( (count) => {
		console.log('TODO');
		console.log(count);
	}, (err) => {
		console.log(err);
	});
	
	client.close();
});
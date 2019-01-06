const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoAPP',  { useNewUrlParser: true } , (err, client) => {
	if(err) {
	return	console.log('Unable to connect to Db Server');
	}
	console.log('Connected to mongoDB Server');
	const db = client.db('Todos');
	
	db.collection('Todos').insertOne({
		text: 'hi loooo',
		completed: false
	}, (err, result) => {
		if(err) {
			return console.log('failed to create collection');
		}
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
	});
	
	client.close();
});
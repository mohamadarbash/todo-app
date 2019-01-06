const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/todoAPP',  { useNewUrlParser: true } , (err, client) => {
	if(err) {
	return	console.log('Unable to connect to Db Server');
	}
	console.log('Connected to mongoDB Server');
	const db = client.db('Todos');
	

    db.collection('Todos').findOneAndUpdate({text: 'arbash'}, {$set: {text: 'memo'}, $inc: {age: 7}}, {returnOriginal: false})
	.then((result) => {
		console.log(result);
	});
		
	client.close();
});
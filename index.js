const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const uri = "mongodb+srv://userAtelier4:userAtelier4@test.fd0emeb.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function connect() {
	try {
	  await client.connect();
	  console.log('Connected to MongoDB Atlas');
	} catch (error) {
	  console.error('Error connecting to MongoDB Atlas:', error);
	}
}

async function insertMessage(sender, customer, seller, message, time) {
	try {
		const collection = client.db("Atelier4").collection("messagerie");
		const Ob = { sender: sender, customer: customer, seller: seller, message: message, time: time };
		const result = await collection.insertOne(Ob);
		console.log('Message inserted with id:', result.insertedId);
		return true
	} catch (error) {
		console.error('Error inserting message:', error);
		return false
	}
			

} 

connect()

const bodyParser = require('body-parser');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

server.listen(3000, () => {
  console.log('listening on *:3000');
});

app.post('/message', (req, res) => {
	const body = req.body;

	console.log(req.body);

	const time = new Date();
	console.log(time);


	if ((body.sender === body.seller || body.sender === body.customer)  && body.message != '' && body.customer != '' && body.seller != '') {
		insertMessage(body.sender, body.customer, body.seller, body.message, time) ? res.send('Message received') : res.send('Something went wrong');
	}
	else {
		res.send('Something went wrong, ensure that you have the correct parameters message look like {customer: "customer name", seller: "seller name", sender: "customer or seller", message: "message"}');
	}
	
});


app.get('/messages', (req, res) => {
	const { customerq, sellerq } = req.query;
	const query = {customer: customerq, seller: sellerq};
	
	try {
		const collection = client.db('Atelier4').collection('messagerie');
		const messages = collection.find( query)
		console.log(messages);
		res.json(messages);
	  } catch (error) {
		console.error('Error retrieving messages:', error);
		res.status(500).json({ error: 'Something went wrong' });
	  }
});

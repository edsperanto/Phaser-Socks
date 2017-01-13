const express = require('express');
const OP = require('./public/js/OP');
const app = express();

const { Server : WebSocketServer } = require('ws');
// const Server = require('ws').WebSocketServer;
const server = require('http').createServer();
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

//"username" => client
const players = new Map();

app.get('/api/hello', (req, res) => {
  const hello = 'world';
  res.json({ hello });
});

function clientReceiveMessage(message) {
	let msg;
	try{
		msg = OP.parse(message);
	}catch(error) {
		console.error(error);
		return this.send(OP.create(OP.ERROR, { error }));
	}
}

wss.on('connection', client => {
	client.username = null;

	client.on('message', clientReceiveMessage.bind(client));

});

server.on('request', app);
server.listen(PORT, _ =>
  console.log('Server Listening on ' + server.address().port)
);
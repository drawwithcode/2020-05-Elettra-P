console.log("working for ducks")

let express = require('express')

let app = express();

let port = 3000;

let server = app.listen(port);

app.use(express.static('public'));

let socket = require('socket.io');

let io = socket(server);

io.on('connection', newConnection);

function newConnection(socket){

	console.log('new connection:', socket.client.id);

	socket.on('mouse', mouseMessage);

	function mouseMessage(dataReceived){
		
		console.log(dataReceived);

		socket.broadcast.emit('mouseBroadcast', dataReceived);

	}

}

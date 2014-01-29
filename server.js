//Server

var net = require("net");
var Readline = require("readline");
var count = 0;
var engaged = 0;

var sockets = [];
var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});
  
var server = net.createServer(function(socket){
	
	count++;
		var playerObject = {
							mode: "standbye",
							myId: count, 
							createMessage: function(message){return this.name + ":" + message;}, 
							sendMessage: function(message) { this.socket.write(message) },
							setupPlayer: function(name, socket){this.name = name; this.socket = socket;console.log( "user "+ this.myId + " has set name to " + this.name);},
							chatMode: chatMode};
	
	console.log("new Client Connected");
	console.log(count + " Clients Connected");
	
	socket.write("welcome, you are among " + (count-1) + " other People");
	
	socket.write("what is your name?");
	socket.once("data", function(stream){
	playerObject.setupPlayer(stream.toString(), socket);
	
	sockets.push(playerObject);
	SendMessageToAll("You are Not alone!", playerObject);
	
	socket.once("data", playerObject.chatMode);
	});
});
	
function chatMode(stream){

	
	var playerObject = findBySocket(this);
	var streamMessage = stream.toString() 
	console.log(playerObject.mode );
	if(streamMessage != "engage"){
		playerObject.socket.once("data", playerObject.chatMode);
		SendMessageToAll( playerObject.createMessage(streamMessage), playerObject);
		return;
	}
	else if(playerObject.mode == "standbye"){
		if(count == 1){
			playerObject.sendMessage("Not Enough players to engage");
			playerObject.socket.once("data", playerObject.chatMode);
			return;
		}
	
		playerObject.mode = "engage";
		engaged++;
		
		if(engaged < count){
			playerObject.sendMessage("waiting for all players engaged.");
			return;
		}
		
		StartGame();
	}
}

function findBySocket(socket){
	for(var i = 0; i < count; i++)
	{
		if (sockets[i].socket == socket)
		{
			return sockets[i];
		}
	}
	return null;
}

function startGame(){
	for(var i = 0; i < count; i++)
	{
		sockets[i].sendMessage("here we go");
	}
}

	
server.listen(process.argv[2]);
var message = "";

inter.on("line", function(data){
	if(data.toString() == "end last")
	{
		sockets[sockets.length-1].end("you are released");
		sockets.pop();
		count--;
		data = "Last player was kicked out";
	}
	
	for(var i = 0; i < sockets.length; i++){
		SendMessageToAll(data);
	}
	
}
);

function SendMessageToAll(message, playerObject){
for(var i = 0; i < sockets.length ; i++){
		if( playerObject == null || sockets[i].socket != playerObject.socket)
			sockets[i].socket.write(message);
	}
}
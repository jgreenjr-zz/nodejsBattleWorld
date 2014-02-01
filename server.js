//Server

var net = require("net");
var Readline = require("readline");
var game = require("./game.js");
var player = require("./player.js")
var engaged = 0;

var games = [];

var sockets = [];
var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});
  
var server = net.createServer(function(socket){
	
	
		var playerObject = player.CreatePlayer(socket, chatMode);
	
	console.log("new Client Connected");
	console.log(sockets.length + " Clients Connected");
	
	socket.write("welcome, you are among " + (sockets.length-1) + " other People");
	
	socket.write("what is your name?");
	socket.once("data", function(stream){
	playerObject.setupPlayer(stream.toString(), socket);
	
	sockets.push(playerObject);
	SendMessageToAll("You are Not alone!", playerObject);
	
	socket.once("data", playerObject.chatMode);
	});
});
var launchingGame = false
	
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
		if(sockets.length == 1){
			playerObject.sendMessage("Not Enough players to engage");
			playerObject.socket.once("data", playerObject.chatMode);
			return;
		}
		else if(launchingGame){
            playerObject.sendMessage("waiting for another game to launch, please try again");
			playerObject.socket.once("data", playerObject.chatMode);
			return;
		}
		
		playerObject.mode = "engage";
	    engaged++;
	    
	    if(engaged == 1){
	        playerObject.sendMessage("Waiting for another player to engage");
			playerObject.socket.once("data", playerObject.chatMode);
	    }
		
		launchingGame = true;
		StartGame();
		launchingGame = false;
	}
}

function findBySocket(socket){
	for(var i = 0; i < sockets.length; i++)
	{
		if (sockets[i].socket == socket)
		{
			return sockets[i];
		}
	}
	return null;
}

function StartGame(){
	for(var i =  sockets.length - 1; i - 1 > 0; i-=2)
	{
		var g = game.CreateGame( sockets[i], sockets[i+1]);
		sockets.pop();
		sockets.pop();
		games.push(g)
		playTurn(g);
	}
}

function playTurn(g){
    
    /*g.player1.SendStats(player2);
    
    g.player1.SendStats(player1);*/
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
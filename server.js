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
	
	
	var playerObject = player.CreatePlayer(chatMode);
	
	console.log("new Client Connected");

	if(sockets.length > 0)
        socket.write("welcome, you are among " + (sockets.length) + " other People\n");
	else
	    socket.write("Welcome, you are the only one logged on right now.\n");
	
	socket.write("what is your name?");
	socket.once("data", function(stream){
	playerObject.setupPlayer(stream.toString(), socket);
	
	sockets.push(playerObject);
	SendMessageToAll("New Player Joined: " +  playerObject.name, {SendToSelf:false, selfSocket:socket,state:"standbye"});
	socket.write("Who Do you Want to Play? (-l  list)");
	socket.once("data", playerObject.chatMode);
	});
});

	
function chatMode(stream){
	var playerObject = findBySocket(this);
    var value = stream.toString();
    if(value == '-l'){
       SendListOfPlayers(playerObject);
       this.once("data", playerObject.chatMode);
       return;
    }
    console.log(value);
    var oppenent = findByName(value);
    if(!oppenent){
        playerObject.sendMessage("Invalid Opponent");
        SendListOfPlayers(playerObject);
       this.once("data", playerObject.chatMode);
       return;
    }
	
	StartGame(playerObject, oppenent);
		
		
}

function SendListOfPlayers(playerObject, mode){
     var message = "Available Opponents("+(sockets.length-1)+"):\n" ;
       message+= GetListOfPlayer(playerObject, mode);
        playerObject.sendMessage(message);
}

function GetListOfPlayer(playerObject, mode){
    var messsage = "";
    for(var i =0; i < sockets.length; i++){
            console.log(playerObject);
            if((mode === null || sockets[i].mode == mode) && (playerObject === null || sockets[i].name != playerObject.name)){
                message += sockets[i].name +"\n";
            }
    }
    return message;
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
function findByName(name){
	for(var i = 0; i < sockets.length; i++)
	{
		if (sockets[i].name == name)
		{
			return sockets[i];
		}
	}
	return null;
}

function StartGame(player1, player2){
        player1.mode = "ingame";
        player2.mode = "ingame";
		var g = game.CreateGame( player1, player2);
    	games.push(g);
    	console.log("Game Started: " + player1.name + " vs. " + player2.name);
    	playTurn(g);
	
	}


function playTurn(g){
    g.player1.socket.removeAllListeners("data");
    g.player2.socket.removeAllListeners("data");
    var message = g.player1.GetStatus() + "\n"+g.player2.GetStatus()+"\n";
    
    
    g.player1.sendMessage(message);
    
    g.player2.sendMessage(message);
    
    g.player1.sendMessage("Enter Move 1 of 3 (hit, block):");
    
    g.player2.sendMessage("Enter Move 1 of 3 (hit, block):");
    
    g.player1.socket.once("data", getPlayerRole);
    
    g.player2.socket.once("data", getPlayerRole);
}

function getPlayerRole(stream){
    var g = findGamePlayerBySocket(this);
    
    g.player.moves.push(stream);
    
    if(g.player.moves.length < 3){
        g.player.sendMessage("Send Next Move");
        g.player.socket.once("data",getPlayerRole);
    }
    else if(g.otherPlayer.moves.length <3){
        g.player.sendMessage("Waiting for other player");
        g.player.socket.once("data", ignoreInGame);
    }
    else{
        var results = g.game.EvaluteAllMoves();
        var message = "";
         for(var i = 0; i < results.length; i++)
            message += results[i]+"\n";
        g.player.sendMessage(message);
        g.otherPlayer.sendMessage(message);
    
        if(g.game.IsOver()){
            console.log("Game Ended:" + g.player.name + " vs. " + g.otherPlayer.name)
            message = g.game.GetResults()+"\nWho Do you want to play Next?";
            g.player.sendMessage(message);
            g.otherPlayer.sendMessage(message);
            g.player.resetPlayer();
            g.otherPlayer.resetPlayer();
            games.splice(g.game);
            g.player.socket.removeAllListeners("data");
             g.otherPlayer.socket.removeAllListeners("data");
            g.player.socket.once("data", g.player.chatMode);
            g.otherPlayer.socket.once("data", g.player.chatMode);
            return;
        }
        
        playTurn(g.game);
    }
}

function findGamePlayerBySocket(socket){
    for(var i = 0; i < games.length; i++){
        if(games[i].player1.socket == socket){
            return {game: games[i], player: games[i].player1, otherPlayer: games[i].player2};
        }
         if(games[i].player2.socket == socket){
            return {game: games[i], player: games[i].player2, otherPlayer: games[i].player1};
        }
    }
}

function ignoreInGame(stream){
    var g = findGamePlayerBySocket(this);
        g.player.socket.once(ignoreInGame);
}

	
server.listen("20509");
var message = "";

inter.on("line", function(data){
	if(data.toString() == "-l")
	{
	    console.log(GetListOfPlayer(null, null));
	    return;
	}
	
	for(var i = 0; i < sockets.length; i++){
		SendMessageToAll(data, {});
	}
	
}
);

function SendMessageToAll(message, playerObject){
for(var i = 0; i < sockets.length ; i++){
		if( (playerObject.SendToSelf || sockets[i].socket != playerObject.selfSocket) && (!playerObject.state || playerObject.state == sockets[i].mode))
			sockets[i].socket.write(message);
	}
}
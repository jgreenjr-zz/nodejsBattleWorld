exports.CreateManager = function (events){
 return new SocketManagerObject(events);
	
}

function SocketManagerObject(events){
	var players = [];
	this.Add = function (player){
		if(player.socket)
		{
			player.socket.on("end", events.socket_end);
		}
		players.push(player);
	};
	
	this.FindBySocket = function(socket){
		for(var i = 0; i < players.length; i++){
			if(players[i].socket == socket)
				return players[i];
		}
		return null;
	}
	
	this.Remove = function(player){
		players.splice(players.indexOf(player),1);
	}
	
	this.length = function (){ return players.length;};
}
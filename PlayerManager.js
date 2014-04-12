exports.CreateManager = function (events){
 return new PlayerManagerObject(events);
	
}

function PlayerManagerObject(events){
	var players = [];
	
	this.Add = function (player){
		if(player.socket)
		{
			player.socket.once("end", events.socket_end);
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
		
	this.FindByName = function(name){
		for(var i = 0; i < players.length; i++){
			if(players[i].name == name)
				
				return players[i];
		}
		return null;
	}
	
	this.Remove = function(player){
		players.splice(players.indexOf(player),1);
	}
	
	this.IsUsedName = function(name){
	
		if(this.FindByName(name) === null)
					return false;
		return true;
	}
	
	this.GetListOfPlayers = function(args){
		args = this.FixArgs(args);
		
		var returnList = [];
		for(var i = 0; i < players.length; i++){
			if(args.Not.indexOf(players[i].name) == -1 && (args.Mode == null || players[i].mode == args.Mode ))
			returnList.push(players[i].name);
		}
		return returnList;
	}
		
	this.length = function (){ return players.length;};
	
	this.SendMessage = function(message, args){
		args = this.FixArgs(args);
		
		for(var i = 0; i < players.length; i++)
		{
			if(args.Not.indexOf(players[i]) == -1 && (args.Mode == null || players[i].mode == args.Mode ))
			{
				players[i].SendMessage(message);
			}
		}
	}
	
	this.FixArgs = function(args){
		if(args == null){
			args = {};
		}
		
		if(args.Not == null)
		{
			args.Not = [];
		}
		
		return args;
	}
}
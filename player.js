


exports.CreatePlayer = function (chatMode){
    return {
		mode: "standbye",
		createMessage: function(message){return this.name + ":" + message;}, 
		sendMessage: function(message) { this.socket.write(message) },
		setupPlayer: function(name, socket){this.name = name; this.socket = socket;return( "user "+ this.myId + " has set name to " + this.name);},
		chatMode: chatMode,
		health: 2,
		hitDamage: 2,
		moves:[],
		GetStatus: function(){ var stunnedMessage = this.stunned ? "STUNNED!!\n" : ""; return "----------------\nName:"+this.name+"\nHit Damamge:"+this.hitDamage+"\nHealth:"+this.health+"\n"+stunnedMessage+"----------------";},
		TakeDamage: function(damage){this.health-= damage; if(this.health < 0) this.health = 0;},
		IsComputerPlayer:false,
		resetPlayer: function(){this.mode = "standbye"; this.health = 20;}
    };
};

exports.CreatePlayer = function (socket, chatMode){
    return {
							mode: "standbye",
							createMessage: function(message){return this.name + ":" + message;}, 
							sendMessage: function(message) { this.socket.write(message) },
							setupPlayer: function(name, socket){this.name = name; this.socket = socket;console.log( "user "+ this.myId + " has set name to " + this.name);},
							chatMode: chatMode,
							health: 10,
							hitDamage: 2};
}
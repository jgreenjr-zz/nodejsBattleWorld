var gameFactory = require("./game.js");

exports.CreateManager = function (events){
    
 return new GameManagerObject(events);
}

function GameManagerObject(events){
    
   
    var games = [];
    this.CreateGame = function(player1, player2){
       
        player1.socket.on("data", events.player_turn)
        
        player2.socket.on("data", events.player_turn)
        var g = gameFactory.CreateGame(player1, player2);
        games.push(g);
    }
    
    this.length = function(){
        return games.length;
    }
    
    this.FindBySocket = function(socket){
        for(var i = 0; i < this.games.length; i++){
            if(this.games[i].player1.socket == socket||
                this.games[i].player2.socket == socket){
                return this.games[i];
            }
        }
        return null;
    };
}
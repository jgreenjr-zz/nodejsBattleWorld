var gameFactory = require("./game.js");

exports.CreateManager = function (events){
    
 return new GameManagerObject(events);
}

function GameManagerObject(events){
    
   
    var games = [];
    this.CreateGame = function(player1, player2){
       
        player1.socket.once("data", events.player_turn)
        
        player2.socket.once("data", events.player_turn)
        var g = gameFactory.CreateGame(player1, player2);
        this.Add(g);
    }
    
    this.Add = function(g){
        games.push(g);
    }
    
    this.length = function(){
        return games.length;
    }
    
    this.FindBySocket = function(socket){
        for(var i = 0; i < games.length; i++){
            if(games[i].player1.socket == socket||
                games[i].player2.socket == socket){
                return games[i];
            }
        }
        return null;
    };
    
    this.Remove = function(game){
        var index = games.indexOf(game);
        games.splice(index, 1);
    }
}
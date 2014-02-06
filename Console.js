var player = require("./player.js");
var game = require("./game.js");var Readline = require("readline");
var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});
  
  function newSendMessage(message){
      console.log(message);
  }

  var player1 = player.CreatePlayer(null,null);
  var player2 = player.CreatePlayer(null,null);
  
  player1.sendMessage = newSendMessage;
  player2.sendMessage = newSendMessage;
  var gameObj = game.CreateGame(player1, player2);
  
  
  
  function playerTurn(){
     
 
       var message = gameObj.player1.GetStatus() + "\n"+gameObj.player2.GetStatus();
    
    
    gameObj.player1.sendMessage(message);
  
    inter.question(player1.name+" enter your move (hit, block): ", function(stream){ player1.moves = []; player1.moves.push(stream.toString(), null)
    
    inter.question(player2.name+" enter your move (hit, block): ", function(stream){ player2.moves = []; player2.moves.push(stream.toString(), null) 
    
    console.log(gameObj.EvaluteMove());
    if(!gameObj.IsOver())
        playerTurn();
    });
    });
    
    
  
  }
  
  inter.question("player1 name:", function(stream){ player1.setupPlayer(stream.toString(), null) 
  
  inter.question("player2 name:", function(stream){ player2.setupPlayer(stream.toString(), null) 
  playerTurn();
  });
  });
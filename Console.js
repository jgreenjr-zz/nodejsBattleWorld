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
     
 
 player1.moves = [];
 player2.moves =[];
var message = gameObj.player1.GetStatus() + "\n"+gameObj.player2.GetStatus();
    
    
    gameObj.player1.sendMessage(message);
  
    collectPlayer1();
    
    
  
  }
  
  function collectPlayer1(){
  inter.question(player1.name+" enter your move (hit, block): ", function(stream){ player1.moves.push(stream.toString())
    if(player1.moves.length < 3){
        collectPlayer1();
        return;
    }
    
    collectPlayer2();
    });
  }
  
  function collectPlayer2(){
  inter.question(player2.name+" enter your move (hit, block): ", function(stream){ player2.moves.push(stream.toString()) 
    if(player2.moves.length <3){
        collectPlayer2();
        return;
    }
    
    var results = gameObj.EvaluteAllMoves();
    for(var i = 0; i < results.length; i++)
        console.log(results[i]);
    if(!gameObj.IsOver())
       { playerTurn();
        return;}
        console.log(gameObj.GetResults());
        process.kill();
    });
  }
  inter.question("player1 name:", function(stream){ player1.setupPlayer(stream.toString(), null) 
  
  inter.question("player2 name:", function(stream){ player2.setupPlayer(stream.toString(), null) 
  playerTurn();
  });
  });
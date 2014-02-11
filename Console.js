var player = require("./player.js");
var computerPlayerCreator = require("./computerPlayer.js");
var game = require("./game.js");var Readline = require("readline");
var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});
  
  function newSendMessage(message){
      console.log(message);
  }
  
  var player1 = player.CreatePlayer(null,null);
 
  var player2 = player.CreatePlayer(null,null);
  
   if(process.argv.length >=3 && process.argv[2] == "true")
    player2 = computerPlayerCreator.CreateComputerPlayer();
  
  player1.sendMessage = newSendMessage;
  player2.sendMessage = newSendMessage;
  var gameObj = game.CreateGame(player1, player2);
  
  var States = [{
      State: "Player1Name",
      Message: function(){return "Enter Player 1 Name";},
      CollectionEvent: function(stream){
          player1.setupPlayer(stream.toString());
          findNextState();
      },
      NextAction: function(){
          if(player2.IsComputerPlayer)
            return "CollectPlayer1Moves";
        return "Player2Name";
      }
    },
    {
      State: "Player2Name",
      Message: function(){return "Enter Player 2 Name";},
      CollectionEvent: function(stream){
          player2.setupPlayer(stream.toString());
          findNextState();
      },
      NextAction: function(){
        return "CollectPlayer1Moves";
      }
    },{
      State: "CollectPlayer1Moves",
      Message: function(){
           var message =""; 
           //console.log(player1.moves);
           if(!player1.moves || player1.moves.length === 0)
          {
             message = gameObj.player1.GetStatus() + "\n"+gameObj.player2.GetStatus()+'\n';
              
          }
          return message+ player1.name+" enter your move (hit, block): ";},
      CollectionEvent: function(stream){
          player1.moves.push(stream.toString());
          findNextState();
      },
      NextAction: function(){
        if(player1.moves.length < 3)
            return "CollectPlayer1Moves";
        if(player2.IsComputerPlayer){
            player2.moves = player2.GetMoves(player1);
            ProcessMoves();
            return "CollectPlayer1Moves"
        }
        return "CollectPlayer2Moves";
      }
    },
    {
      State: "CollectPlayer2Moves",
      Message: function(){return player2.name+" enter your move (hit, block): ";},
      CollectionEvent: function(stream){
          player2.moves.push(stream.toString());
          findNextState();
      },
      NextAction: function(){
        if(player2.moves.length < 3)
            return "CollectPlayer2Moves";
        
        ProcessMoves();
        
        return "CollectPlayer1Moves";
      }
    } ]
  
   function ProcessMoves(){
    var results = gameObj.EvaluteAllMoves();
    for(var i = 0; i < results.length; i++)
        console.log(results[i]);
    if(gameObj.IsOver())
       { 
        console.log(gameObj.GetResults());
        process.exit();
       }
       
  }
  
  function findNextState(){
      var nextState = currentState.NextAction();
      for(var i =0 ; i<States.length; i++){
          if(States[i].State == nextState)
            {currentState = States[i];
            RunStep();
            return;
            }
      }
       console.log("deadEnd!");
        process.exit();
  }
  
  var currentState = States[0];
  
  function RunStep(){
      console.log(currentState.Message());
      inter.once("line", currentState.CollectionEvent)
  }
  
  RunStep();
  
  
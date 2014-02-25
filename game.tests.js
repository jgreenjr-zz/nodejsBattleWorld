var testrunner = require("./testrunner.js");
var game = require("./game.js");
var player = require("./player.js");
testrunner.PassOff=true;
testrunner.Test("Game is Setup Correctly", GameIsSetupCorrectly);
testrunner.Test("double hit damage test", HitHitHurtsBothWithHalfHitDamage);
testrunner.Test("GetMoveCallShouldRemoveMoveFromMovesList", GetMoveCallShouldRemoveMoveFromMovesList);
testrunner.Test("HitBlockShouldStunOtherPlayer", HitBlockShouldStunOtherPlayer);
testrunner.Test("StunnedPlayerReturnsStunned",StunnedPlayerReturnsStunned);
testrunner.Test("hittingStunnedPlayerShouldResultInFullDamage", hittingStunnedPlayerShouldResultInFullDamage)


function GameIsSetupCorrectly(){
    var player1 = {playerName: "player1", SetInGame: function(){}};
    var player2 = {playerName: "player2", SetInGame: function(){}};
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsTrue(g.player1 == player1 && g.player2 == player2, "players not set");
        
}

function HitHitHurtsBothWithHalfHitDamage(){
    var player1 = player.CreatePlayer(null, null);
    var player2 = player.CreatePlayer(null, null);
    
    player1.moves.push("hit");
    player2.moves.push("hit");
    
    var g = game.CreateGame(player1, player2);
    
    g.EvaluteMove();
    
    return testrunner.Assert.And([testrunner.Assert.IsTrue(player1.health==19, "player 1 damage not calculated Correctly"), testrunner.Assert.IsTrue(player2.health==19, "player 2 damage not calculated Correctly")]);
}

function GetMoveCallShouldRemoveMoveFromMovesList(){
    var player1 = {moves:["block", "hit"], SetInGame: function(){}};
    var player2 = {moves:["hit", "block"], SetInGame: function(){}};
    var g = game.CreateGame(player1, player2);
    var move = g.GetNextMove(player1);
    
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(move == "block", move),
        testrunner.Assert.IsTrue(g.player1.moves.length === 1, "move was not pulled from list")]
        );
}

function HitBlockShouldStunOtherPlayer(){
    var player1 = {moves:["block"], SetInGame: function(){}};
    var player2 = {moves:["hit"], SetInGame: function(){}};
    var g = game.CreateGame(player1, player2);
    g.EvaluteMove();
    
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(player2.stunned, "Player was not stunned")
        
        ]);
}

function StunnedPlayerReturnsStunned(){
  var player1 = {stunned: true, moves:["hit"], SetInGame: function(){}};
  var player2 = {stunned: true, moves:["hit"], SetInGame: function(){}};
  var g = game.CreateGame(player1, player2);
  
  var move = g.GetNextMove(player1);
  return testrunner.Assert.IsTrue(g.Stunned == move, "Player should be stunned but "+ move);
}

function hittingStunnedPlayerShouldResultInFullDamage(){
    var player1 = {hitDamage: 2, health: 2, moves:[ "hit"], SetInGame: function(){}};
    var player2 = player.CreatePlayer(null, null);
    player2.stunned = true;
  var g = game.CreateGame(player1, player2);
  
  g.EvaluteMove();
  
  return testrunner.Assert.IsEqual(player2.health,18);
    
}

testrunner.Test("StunnedPlayerShouldBeUnstunedAfterTurn", function(){
    var player1 = {hitDamage: 2, health: 2, moves:[ "hit"], SetInGame: function(){}};
    var player2 = player.CreatePlayer(null, null);

  var g = game.CreateGame(player1, player2);
  
  g.EvaluteMove();
  
  return testrunner.Assert.IsTrue(!player2.stunned , "player is still stunned");
    
})


testrunner.Test("",function (){
  var player1 = {moves:[], SetInGame: function(){}};
    player1.moves.push("block");
    
    var g = game.CreateGame(player1, player1);
    var move = g.GetNextMove(player1);
    player1.moves.push("hit")
    var move2 = g.GetNextMove(player1);
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(move == "block", move),
        testrunner.Assert.IsTrue(move2 == "hit" , move2)]
        );
    
})

testrunner.Test("withPlayerObjectTest", function(){
    var player1 = player.CreatePlayer(null, null);
    var g = game.CreateGame(player1, player1);
    player1.moves.push("block")
    var move = g.GetNextMove(player1);
    player1.moves.push("hit")
    var move2 = g.GetNextMove(player1);
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(move == "block", move),
        testrunner.Assert.IsTrue(move2 == "hit" , move2)]
        );
})

testrunner.Test("RunAllMoves", function(){
    var player1 = player.CreatePlayer(null, null);
    player1.setupPlayer("test1", null);
    var player2 = player.CreatePlayer(null, null);
    player2.setupPlayer("test2", null);
    
    player1.moves.push("hit", "hit", "hit");
    
    player2.moves.push("hit", "hit", "hit");
    
    var g = game.CreateGame(player1, player2);
    var results = g.EvaluteAllMoves();
    
    return testrunner.Assert.IsEqual(3, results.length);
    
})

testrunner.Test("ConvertShort", function(){
    var player1 = {moves:["b", "h"], SetInGame: function(){}};
    
    var g = game.CreateGame(player1, player1);
    var move1 = g.GetNextMove(player1);
    var move2 = g.GetNextMove(player1);
    
    return testrunner.Assert.And([
        testrunner.Assert.IsEqual(g.Block, move1),
        testrunner.Assert.IsEqual(g.Hit, move2)
        ])
});

testrunner.Test("Game is Over", function(){
    var player1 = player.CreatePlayer(null, null);
    var player2 = player.CreatePlayer(null, null);
    
    player1.health = 0;
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsTrue(g.IsOver(), "Not Over");
})

testrunner.Test("Game results: Player 1", function(){
    var player1 = player.CreatePlayer(null, null);
    var player2 = player.CreatePlayer(null, null);
    
    player1.health = 0;
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsEqual(player1.name+" has been defeated!", g.GetResults());
});

testrunner.Test("Game results: Player 2", function(){
    var player1 = player.CreatePlayer(null, null);
    var player2 = player.CreatePlayer(null, null);
    
    player2.health = 0;
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsEqual(player2.name+" has been defeated!", g.GetResults());
});


testrunner.Test("Game results: Player 1 and 2", function(){
    var player1 = player.CreatePlayer(null, null);
    var player2 = player.CreatePlayer(null, null);
    
    player2.health = 0;
    
    player1.health = 0;
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsEqual("undefined and undefined's battle has ended in a draw", g.GetResults());
});

testrunner.Test("player mode should switch for both players", function(){
    var player1 = player.CreatePlayer(null, null);
    var player2 = player.CreatePlayer(null, null);
    
    var g = game.CreateGame(player1, player2);
    
    return 
        testrunner.Assert.And([
    testrunner.Assert.IsEqual(player.PlayerModes.InGame, player1.mode),
    testrunner.Assert.IsEqual(player.PlayerModes.InGame, player2.mode)
    ]);
    });
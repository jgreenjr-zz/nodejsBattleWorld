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
    var player1 = {playerName: "player1"};
    var player2 = {playerName: "player2"};
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsTrue(g.player1 == player1 && g.player2 == player2, "players not set");
        
}

function HitHitHurtsBothWithHalfHitDamage(){
    var player1 = {hitDamage: 2, health: 2, moves:[ "hit"]};
    var player2 = {hitDamage: 2, health: 2, moves:[ "hit"]};
    
    var g = game.CreateGame(player1, player2);
    
    g.EvaluteMove();
    
    return testrunner.Assert.And([testrunner.Assert.IsTrue(player1.health==1, "player 1 damage not calculated Correctly"), testrunner.Assert.IsTrue(player2.health==1, "player 2 damage not calculated Correctly")]);
}

function GetMoveCallShouldRemoveMoveFromMovesList(){
    var player1 = {moves:["block", "hit"]};
    var player2 = {moves:["hit", "block"]};
    var g = game.CreateGame(player1, player2);
    var move = g.GetNextMove(player1);
    
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(move == "block", move),
        testrunner.Assert.IsTrue(g.player1.moves.length === 1, "move was not pulled from list")]
        );
}

function HitBlockShouldStunOtherPlayer(){
    var player1 = {moves:["block"]};
    var player2 = {moves:["hit"]};
    var g = game.CreateGame(player1, player2);
    g.EvaluteMove();
    
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(player2.stunned, "Player was not stunned")
        
        ]);
}

function StunnedPlayerReturnsStunned(){
  var player1 = {stunned: true, moves:["hit"]};
  
  var g = game.CreateGame(player1, null);
  
  var move = g.GetNextMove(player1);
  return testrunner.Assert.IsTrue(g.Stunned == move, "Player should be stunned but "+ move);
}

function hittingStunnedPlayerShouldResultInFullDamage(){
    var player1 = {hitDamage: 2, health: 2, moves:[ "hit"]};
    var player2 = {hitDamage: 2, health: 2, moves:[ "hit"], stunned:true};

  var g = game.CreateGame(player1, player2);
  
  g.EvaluteMove();
  
  return testrunner.Assert.IsTrue(player2.health ===0, "total damage not taken");
    
}

testrunner.Test("StunnedPlayerShouldBeUnstunedAfterTurn", function(){
    var player1 = {hitDamage: 2, health: 2, moves:[ "hit"]};
    var player2 = {hitDamage: 2, health: 2, moves:[ "hit"], stunned:true};

  var g = game.CreateGame(player1, player2);
  
  g.EvaluteMove();
  
  return testrunner.Assert.IsTrue(!player2.stunned , "player is still stunned");
    
})


testrunner.Test("",function (){
  var player1 = {moves:[]};
    player1.moves.push("block");
    
    var g = game.CreateGame(player1, null);
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
    var g = game.CreateGame(player1, null);
    player1.moves.push("block")
    var move = g.GetNextMove(player1);
    player1.moves.push("hit")
    var move2 = g.GetNextMove(player1);
    return testrunner.Assert.And([
        testrunner.Assert.IsTrue(move == "block", move),
        testrunner.Assert.IsTrue(move2 == "hit" , move2)]
        );
})
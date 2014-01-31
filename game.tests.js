var testrunner = require("./testrunner.js");
var game = require("./game.js");

testrunner.AddTest("Game is Setup Correctly", GameIsSetupCorrectly);
testrunner.AddTest("double hit damage test", HitHitHurtsBothWithHalfHitDamage);
testrunner.AddTest("GetMoveCallShouldRemoveMoveFromMovesList", GetMoveCallShouldRemoveMoveFromMovesList);
testrunner.AddTest("HitBlockShouldStunOtherPlayer", HitBlockShouldStunOtherPlayer);
testrunner.RunTests();

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
        testrunner.Assert.IsTrue(player2.stuned, "Player was not stuned")
        
        ]);
}

function StunedPlayerTakesFullHit(){
 
}


var testrunner = require("./testrunner.js")
var game = require("./game.js")

testrunner.AddTest("Game is Setup Correctly", GameIsSetupCorrectly)
testrunner.RunTests();

function GameIsSetupCorrectly(){
    var player1 = {playerName: "player1"};
    var player2 = {playerName: "player2"};
    
    var g = game.CreateGame(player1, player2);
    
    return testrunner.Assert.IsTrue(g.player1 == player1 && g.player2 == player2, "players not set");
        
}

function HitHitHurtsBothWithHalfHitDamage(){
    var player1 = {hitDamage: 2, health: 2}
    var player2 = {hitDamage: 2, health: 2}
    
    var g = game.CreateGame(player1, player2)
    
    g.CalculateMove(game.Hit, game.Hit);
}
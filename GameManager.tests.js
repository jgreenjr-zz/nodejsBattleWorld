var testrunner = require("./testrunner.js");
var gameFactory = require("./game.js");
var gameManager = require("./GameManager.js");
var playerFactory = require("./player.js");

testrunner.PassOff = true;


testrunner.Test("Should create a game for 2 players", function(){
    var gm = gameManager.CreateManager({});
    var player1 = {mode:playerFactory.PlayerModes.StandBy};
	var player2 = {mode: playerFactory.PlayerModes.StandBy};
	var game = gameFactory.CreateGame(player1, player2)
	
	gm.Add(game);
	
	var asserts = [];
	asserts.push(testrunner.Assert.IsEqual(1, gm.length()));
	asserts.push(testrunner.Assert.IsEqual(playerFactory.PlayerModes.InGame, player1.mode))
	asserts.push(testrunner.Assert.IsEqual(playerFactory.PlayerModes.InGame, player1.mode))
})

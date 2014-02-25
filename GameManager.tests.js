var testrunner = require("./testrunner.js");
var gameFactory = require("./game.js");
var gameManager = require("./GameManager.js");
var playerFactory = require("./player.js");
var socket = require("./mock/Socket.js");
testrunner.PassOff = true;

function createFakePlayer(){
    var s = socket.CreateSocket();
    var player1 = {mode: playerFactory.PlayerModes.InGame, socket: s, SetInGame:function(){}};
    return player1;
}


testrunner.Test("Should create a game for 2 players", function(){
    var gm = gameManager.CreateManager({});
    var player1 = createFakePlayer();
	var player2 = createFakePlayer();
	
	gm.CreateGame(player1, player2);
	
	var asserts = [];
	asserts.push(testrunner.Assert.IsEqual(1, gm.length()));
	
	return testrunner.Assert.And(asserts);
});

testrunner.Test("Should be able to find game based off player socket", function(){
    var gm = gameManager.CreateManager({});
    
    var player1 = createFakePlayer();
    var player2 = createFakePlayer();
    player1.socket = 1;
    var game = gameFactory.CreateGame(player1, player2);
    gm.games = [game];
    
    var result = gm.FindBySocket(1);
    
	return testrunner.Assert.IsEqual(game, result);
    
})

testrunner.Test("Should add play turn to data on socket", function(){

    var gm = gameManager.CreateManager({player_turn: function(){/*asdf*/}});
    
      var player1 = createFakePlayer();
    var player2 = createFakePlayer();
    
    var game = gm.CreateGame(player1, player2);
   
   	var asserts = [];
	asserts.push(testrunner.Assert.IsEqual(1, player1.socket.events.length));
	asserts.push(testrunner.Assert.IsEqual(1, player2.socket.events.length));
	
	return testrunner.Assert.And(asserts);
});
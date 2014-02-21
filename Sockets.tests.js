var testrunner = require("./testrunner.js");
var playerFactory = require("./player.js");
var socket = require("./mock/Socket.js");
var socketManager = require("./SocketManager.js");
testrunner.PassOff = true;

testrunner.Test("Should allow you to add a new player to the manager", function(){
	var sm = socketManager.CreateManager({});
	var player = playerFactory.CreatePlayer(null);
	
	sm.Add(player);
	
	return testrunner.Assert.IsEqual(1, sm.length());
	});
	
	
	testrunner.Test("Should be able to find player by socket", function(){
	var sm = socketManager.CreateManager({});
	var s =  socket.CreateSocket();
	var player = playerFactory.CreatePlayer(null);
	player.socket = s
	sm.Add(player);

	
	var p = sm.FindBySocket(s);
	
	return testrunner.Assert.IsEqual(player, p);
	});
	
	
testrunner.Test("Should be able to find player by name", function(){
	var sm = socketManager.CreateManager({});
	var player = playerFactory.CreatePlayer(null);
	player.name = "jay"
	sm.Add(player);

	
	var p = sm.FindByName("jay");
	
	return testrunner.Assert.IsEqual(player, p);
});
	
	
testrunner.Test("Should allow you to remove an existing player by name the manager", function(){
	var sm = socketManager.CreateManager({});
	var player = playerFactory.CreatePlayer(null);
	player.name="jay";
	sm.Add(player);
	sm.Remove("jay");
	return testrunner.Assert.IsEqual(0, sm.length());
});

testrunner.Test("Should AddDefaultActions to socket", function(){
	var endEvent = function(){/*end*/ };
	
	var sm = socketManager.CreateManager({socket_end:endEvent});
	var s =  socket.CreateSocket();
	var player = playerFactory.CreatePlayer(null);
	player.socket = s
	sm.Add(player);
	
	var asserts = [];
	asserts.push(testrunner.Assert.IsEqual(1, s.events.length));
	asserts.push(testrunner.Assert.IsEqual(endEvent, s.getEvent("end")));
	
	return testrunner.Assert.And(asserts);
});

testrunner.Test("Should Warn of used name", function(){
	var sm = socketManager.CreateManager({});
	var player = playerFactory.CreatePlayer(null);
	player.name="jay";
	sm.Add(player);
		
	var asserts = [];
	asserts.push(testrunner.Assert.IsEqual(true, sm.IsUsedName("jay")));
	asserts.push(testrunner.Assert.IsEqual(false, sm.IsUsedName("dave")));
	
	return testrunner.Assert.And(asserts)
});

testrunner.Test("Should send a message to all users ",  function(){
	var sm = socketManager.CreateManager({});
	var player1 = playerFactory.CreatePlayer(null);
	
	var player1Message = "";
	var player2Message = "";
	
	player1.SendMessage = function(message){ player1Message = message;};
	
	var player2 = playerFactory.CreatePlayer(null);
	player2.SendMessage = function(message){ player2Message = message;};
	
	sm.Add(player1);
	sm.Add(player2);
		
	sm.SendMessage("THIS IS MY MESSAGE");
	
	var asserts = [];
	
	asserts.push(testrunner.Assert.IsEqual("THIS IS MY MESSAGE", player1Message));
	asserts.push(testrunner.Assert.IsEqual("THIS IS MY MESSAGE", player2Message));
		
	return testrunner.Assert.And(asserts)
});

testrunner.Test("Should send a message to all users but player1",  function(){
	var sm = socketManager.CreateManager({});
	var player1 = playerFactory.CreatePlayer(null);
	
	var player1Message = "";
	var player2Message = "";
	
	player1.SendMessage = function(message){ player1Message = message;};
	
	var player2 = playerFactory.CreatePlayer(null);
	player2.SendMessage = function(message){ player2Message = message;};
	
	sm.Add(player1);
	sm.Add(player2);
		
	sm.SendMessage("THIS IS MY MESSAGE", {Not:[player1]});
	
	var asserts = [];
	
	asserts.push(testrunner.Assert.IsEqual("", player1Message));
	asserts.push(testrunner.Assert.IsEqual("THIS IS MY MESSAGE", player2Message));
		
	return testrunner.Assert.And(asserts)
});

testrunner.Test("Should send a message to all users in x",  function(){
	var sm = socketManager.CreateManager({});
	var player1 = playerFactory.CreatePlayer(null);
	
	var player1Message = "";
	var player2Message = "";
	
	player1.SendMessage = function(message){ player1Message = message;};
	
	var player2 = playerFactory.CreatePlayer(null);
	player2.SendMessage = function(message){ player2Message = message;};
	player2.mode = playerFactory.PlayerModes.InGame;
	sm.Add(player1);
	sm.Add(player2);
		
	sm.SendMessage("THIS IS MY MESSAGE", {Mode:playerFactory.PlayerModes.StandBy});
	
	var asserts = [];
	
	asserts.push(testrunner.Assert.IsEqual("THIS IS MY MESSAGE", player1Message));
	asserts.push(testrunner.Assert.IsEqual("", player2Message));
		
	return testrunner.Assert.And(asserts)
});

testrunner.Test("Should get a list of all users",  function(){
	var sm = socketManager.CreateManager({});
	var player1 = playerFactory.CreatePlayer(null);
	var player2 = playerFactory.CreatePlayer(null);
	player1.name="jay";
	player2.name="brandon";
	sm.Add(player1);
	sm.Add(player2);
		
	var list = sm.GetListOfPlayers()
		
	return testrunner.Assert.IsEqualArray(list, ["jay", "brandon"]);
});

testrunner.Test("Should get a list of all users but specified",  function(){
	var sm = socketManager.CreateManager({});
	var player1 = playerFactory.CreatePlayer(null);
	var player2 = playerFactory.CreatePlayer(null);
	player1.name="jay";
	player2.name="brandon";
	sm.Add(player1);
	sm.Add(player2);
		
	var list = sm.GetListOfPlayers({Not: "jay"});
		
	return testrunner.Assert.IsEqualArray(["brandon"],list);
});

testrunner.Test("Should get a list of all users in mode specified",  function(){
	var sm = socketManager.CreateManager({});
	var player1 = playerFactory.CreatePlayer(null);
	var player2 = playerFactory.CreatePlayer(null);
	player1.name="jay";
	player2.name="brandon";
	player2.mode = playerFactory.PlayerModes.InGame;
	sm.Add(player1);
	sm.Add(player2);
		
	var list = sm.GetListOfPlayers({Mode: playerFactory.PlayerModes.StandBy});
		
	return testrunner.Assert.IsEqualArray(["jay"],list);
});
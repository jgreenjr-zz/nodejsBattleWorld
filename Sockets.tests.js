var	testrunner = require("./testrunner.js");
var	playerFactory	=	require("./player.js");
var	socket = require("./mock/Socket.js");
var	socketManager	=	require("./SocketManager.js");
testrunner.PassOff = true;

testrunner.Test("Should	allow	you	to add a new player	to the manager", function(){
	var	sm = socketManager.CreateManager({});
	var	player = playerFactory.CreatePlayer(null);
	
	sm.Add(player);
	
	return testrunner.Assert.IsEqual(1,	sm.length());
	});
	
	
	testrunner.Test("Should	be able	to find	player by	socket", function(){
	var	sm = socketManager.CreateManager({});
	var	s	=	 socket.CreateSocket();
	var	player = playerFactory.CreatePlayer(null);
	player.socket	=	s
	sm.Add(player);

	
	var	p	=	sm.FindBySocket(s);
	
	return testrunner.Assert.IsEqual(player, p);
	});
	
	
testrunner.Test("Should	allow	you	to remove	an existing	player by	name the manager", function(){
	var	sm = socketManager.CreateManager({});
	var	player = playerFactory.CreatePlayer(null);
	player.name="jay";
	sm.Add(player);
	sm.Remove("jay");
	return testrunner.Assert.IsEqual(0,	sm.length());
});

testrunner.Test("Should	AddDefaultActions	to socket",	function(){
	var endEvent = function(){/*end*/ };
	
	var	sm = socketManager.CreateManager({socket_end:endEvent});
	var	s	=	 socket.CreateSocket();
	var	player = playerFactory.CreatePlayer(null);
	player.socket	=	s
	sm.Add(player);
	
	var asserts = [];
	asserts.push(testrunner.Assert.IsEqual(1, s.events.length));
	asserts.push(testrunner.Assert.IsEqual(endEvent, s.getEvent("end")));
	
	return testrunner.Assert.And(asserts);
});
var testrunner = require("./testrunner.js");
var player = require("./player.js");

testrunner.Test("GetStatus", function(){
    var p = new player.CreatePlayer(null, null);
    
    var message = p.GetStatus();
    
    return testrunner.Assert.IsEqual("----------------\nName:"+p.name+"\nHit Damamge:"+p.hitDamage+"\nHealth:"+p.health+"\n----------------",
        message);
});

testrunner.Test("GetStunnedStatus", function(){
    var p = new player.CreatePlayer(null, null);
    p.stunned = true;
    var message = p.GetStatus();
    
    return testrunner.Assert.IsEqual("----------------\nName:"+p.name+"\nHit Damamge:"+p.hitDamage+"\nHealth:"+p.health+"\nSTUNNED!!\n----------------",
        message);
});
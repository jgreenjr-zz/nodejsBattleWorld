var testrunner = require("./testrunner.js");
var player = require("./player.js");

testrunner.PassOff = true;

testrunner.Test("GetStatus", function(){
    var p = player.CreatePlayer(null, null);
    
    var message = p.GetStatus();
    
    return testrunner.Assert.IsEqual("----------------\nName:"+p.name+"\nHit Damamge:"+p.hitDamage+"\nHealth:"+p.health+"\n----------------",
        message);
});

testrunner.Test("GetStunnedStatus", function(){
    var p = player.CreatePlayer(null, null);
    p.stunned = true;
    var message = p.GetStatus();
    
    return testrunner.Assert.IsEqual("----------------\nName:"+p.name+"\nHit Damamge:"+p.hitDamage+"\nHealth:"+p.health+"\nSTUNNED!!\n----------------",
        message);
});

testrunner.Test("Take Damage", function(){
    var p = player.CreatePlayer(null, null);
    
    p.TakeDamage(1);
    
    return testrunner.Assert.IsEqual(19, p.health);
})

testrunner.Test("Take too much Damage", function(){
    var p = player.CreatePlayer(null, null);
    
    p.TakeDamage(200);
    
    return testrunner.Assert.IsEqual(0, p.health);
})

testrunner.Test("Reseting should set player back to normal",function(){
    var p = player.CreatePlayer();
    
    p.TakeDamage(200);
    p.mode = "unknown";
    
    p.resetPlayer();
    
    return testrunner.Assert.And([
        testrunner.Assert.IsEqual(player.PlayerModes.StandBy,p.mode),
        testrunner.Assert.IsEqual(20, p.health)]);
    
})
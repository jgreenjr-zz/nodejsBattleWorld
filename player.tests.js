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
    
    return testrunner.Assert.IsEqual(9, p.health);
})

testrunner.Test("Take too much Damage", function(){
    var p = player.CreatePlayer(null, null);
    
    p.TakeDamage(200);
    
    return testrunner.Assert.IsEqual(0, p.health);
})
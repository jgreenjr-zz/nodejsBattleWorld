var testrunner = require("./testrunner.js");
var player = require("./player.js");

testrunner.AddTest("GetStatus", GetStatusString)
testrunner.RunTests();
function GetStatusString(){
    var p = new player.CreatePlayer(null, null);
    
    var message = p.GetStatus();
    
    return testrunner.Assert.IsEqual("----------------\nName:"+p.name+"\nHit Damamge:"+p.hitDamage+"\nHealth:"+p.health+"\n----------------",
        message);
}
var testrunner = require("./testrunner.js");
testrunner.PassOff = true;
var clientConfiguration = require("./ClientConfiguration.js")

var net = require("./mock/Net.js");

testrunner.Test("Should use right configuration Setting",function(){
    var localIP = clientConfiguration.CalculateIP("");
    
    var remoteConnection = clientConfiguration.CalculateIP("IP");
    
    testrunner.Assert.IsEqual("0.0.0.0", localIP);
    testrunner.Assert.IsEqual("IP", remoteConnection);
});


testrunner.Test("Should Create Connection To IP", function(){
    var ip = "someIP";
    
    var endFunction = function(){};
    var dataFunction = function(){};
    var connection = clientConfiguration.createConnection(ip, net, {connection_end:endFunction, connection_data:dataFunction})
    
    testrunner.Assert.IsEqual("Connected to Ip:"+ip, connection.state);
    testrunner.Assert.IsEqual(2, connection.events.length);
    testrunner.Assert.IsEqual(dataFunction, connection.getEvent("data"));
    testrunner.Assert.IsEqual(endFunction, connection.getEvent("end"));
})
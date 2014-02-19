var testrunner = require("./testrunner.js");

var clientConfiguration = require("./ClientConfiguration.js")

var net = require("./mock/Net.js");

testrunner.Test("Should use right configuration Setting",function(){
    var localIP = clientConfiguration.CalculateIP("");
    
    var remoteConnection = clientConfiguration.CalculateIP("IP");
    
    return testrunner.Assert.And(
        [testrunner.Assert.IsEqual("0.0.0.0", localIP),
         testrunner.Assert.IsEqual("IP", remoteConnection)]
        )
});


testrunner.Test("Should Create Connection To IP", function(){
    var ip = "someIP";
    
    var endFunction = function(){};
    var dataFunction = function(){};
    var connection = clientConfiguration.createConnection(ip, net, {connection_end:endFunction, connection_data:dataFunction})
    var asserts = [];
    
    asserts.push(testrunner.Assert.IsEqual("Connected to Ip:"+ip, connection.state));
    asserts.push(testrunner.Assert.IsEqual(2, connection.events.length));
    asserts.push(testrunner.Assert.IsEqual(dataFunction, connection.getEvent("data")));
    asserts.push(testrunner.Assert.IsEqual(endFunction, connection.getEvent("end")));
    return testrunner.Assert.And(asserts);
})
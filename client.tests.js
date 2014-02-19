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
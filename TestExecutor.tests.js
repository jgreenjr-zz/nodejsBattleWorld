var testrunner = require("./testrunner.js");
testrunner.PassOff = true;
testrunner.Test("Test files", function(){
    var goodString = "test.tests.js"
    var badString = "b.js";
    
    return testrunner.Assert.And(
        [
            testrunner.Assert.IsEqual(true,testrunner.IsTestFile(goodString)),
            testrunner.Assert.IsEqual(false, testrunner.IsTestFile(badString))
        ]
        )
    
    });
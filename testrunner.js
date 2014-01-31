var tests = [];

exports.AddTest = function(text, test)
{
    tests.push({text: text, test: test});
}

exports.RunTests = function(){
    
    for(var i = 0; i < tests.length; i++){
        console.log("Running "+ tests[i].text)
        var result = tests[i].test()
        if(result.passed)
            console.log("Result: Passed");
        else
            console.log("Result: Failed: " + result.message);
    }
    
}

exports.createPass = function() { return {passed: true};}

exports.createResult = function(message) {return {passed: false, message: message}; }
    
exports.Assert = {
    IsTrue: function (statement, message){ if(statement) return exports.createPass(); return exports.createResult(message);},
    And: function (results){
        
        for(var i = 0; i < results.length; i++){
            if(!results[i].passed)
                return results[i];
        }
        return exports.createPass();
    }
};

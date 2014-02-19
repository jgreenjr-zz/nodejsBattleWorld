exports.results = {ran: 0, passed: 0, failed: 0, asserts:0};
exports.PassOff = false;

exports.Test = function (text, test){
     
     var result = test();
      exports.results.ran++;  
     
    if(result.passed)
    {
        if(!exports.PassOff)
            console.log(text+"-Result: Passed");
        exports.results.passed++;
    }
    else if(!result.passed)
    {
        exports.results.failed++;
        console.log(text+"-Result: Failed: " + result.message);
    }
}

exports.createPass = function() { return {passed: true};}

exports.createResult = function(message) {return {passed: false, message: message}; }
    
exports.Assert = {
    IsTrue: function (statement, message){exports.results.asserts++; if(statement) return exports.createPass(); return exports.createResult(message);},
    And: function (results){
        
        for(var i = 0; i < results.length; i++){
            if(!results[i].passed)
                return results[i];
        }
        return exports.createPass();
    },
    IsEqual: function(expected, actual){
        exports.results.asserts++;
        if(expected!=actual)
        {
            return exports.createResult("expected: "+expected + "\nActual:" + actual);
        }
        return {passed:true};
    }
};

exports.IsTestFile = function (fileName){
    var length = fileName.length - 8;
    if(length < 0)
        return false;
    return (fileName.substr(length) == "tests.js")
}

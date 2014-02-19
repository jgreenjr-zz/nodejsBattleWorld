var testrunner = require("./testrunner.js");
var computerPlayerCreator = require("./computerPlayer.js");

testrunner.PassOff = true;

testrunner.Test("Should call Non-stunned pattern", function(){
    computerPlayerCreator.StandardMoves = [["normal"]];
    var compPlayer = computerPlayerCreator.CreateComputerPlayer()
    var moves = compPlayer.GetMoves({stunned: false})
    
    return testrunner.Assert.IsEqual(moves[0], computerPlayerCreator.StandardMoves[0][0]);
});

testrunner.Test("Should note Non-humanPlayer", function(){
    var compPlayer = computerPlayerCreator.CreateComputerPlayer()
    var IsComputerPlayer = compPlayer.IsComputerPlayer;
    
    return testrunner.Assert.IsTrue(IsComputerPlayer, "Not marked as computer player");
});


testrunner.Test("Should call stunned pattern", function(){
    computerPlayerCreator.StandardMoves = [["normal"]];
    
    computerPlayerCreator.StunnedMoves = [["stunned"]];
    var compPlayer = computerPlayerCreator.CreateComputerPlayer()
    var moves = compPlayer.GetMoves({stunned: true})
    
    return testrunner.Assert.IsEqual(moves[0], computerPlayerCreator.StunnedMoves[0][0]);
});
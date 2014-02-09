var player = require("./player.js");

exports.CreateComputerPlayer = function (){
    var returnValue = player.CreatePlayer(null);
    returnValue.setupPlayer("Computer Player", null);
    
    returnValue.sendMessage = function(message){};
    
    returnValue.GetMoves = function(p){
        if(p.stunned)
            return exports.StunnedMoves[Math.floor(Math.random()*exports.StunnedMoves.length)];
        return exports.StandardMoves[Math.floor(Math.random()*exports.StandardMoves.length)];
    }
    
    returnValue.IsComputerPlayer = true;
    
    return returnValue;
};

exports.StunnedMoves = [
    ["h", "h", "h"],
    ["h", "h", "b"],
    ["h", "b", "h"],
    ["h", "b", "b"]];

exports.StandardMoves = [
    ["h", "h", "h"],
    ["h", "h", "b"],
    ["h", "b", "h"],
    ["h", "b", "b"],
    ["b", "h", "h"],
    ["b", "h", "b"],
    ["b", "b", "h"],
    ["b", "b", "b"]];
var player = require("./player.js");

exports.CreateComputerPlayer = function (){
    var returnValue = player.CreatePlayer(null);
    returnValue.setupPlayer("Computer Player", null);
    
    returnValue.sendMessage = function(message){};
    
    returnValue.GetMoves = function(p){
        var rv = [];
        if(p.stunned)
            rv =  exports.StunnedMoves[Math.floor(Math.random()*exports.StunnedMoves.length)];
        else
            rv = exports.StandardMoves[Math.floor(Math.random()*exports.StandardMoves.length)];
            
            return rv.slice();
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
    ["b", "h", "h"],
    ["b", "h", "b"]];
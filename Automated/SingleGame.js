var net = require("net");
exports.muted = true;

exports.setup = function(name1, name2){
    {
        var player1 = net.createConnection("20509");
        player1.on("data", exports.processMessage);
        player1.name = name1;
        player1.opp = name2;
        player1.starter = true;
        player1.counter = 0;
        var player2 = net.createConnection("20509");
        player2.on("data", exports.processMessage);
        player2.opp = name1;
        player2.starter = false;
        player2.counter = 0;
        player1.name = name2;
        player1.write(name1);
        player2.write(name2);
    }
}

exports.processMessage = function( message){
  var text = message.toString().toLowerCase();
 
  var messages = text.split("\n");
  
  for(var i = 0; i < messages.length ; i++){
  
    if(!exports.IsMutable(messages[i])&&
        !exports.Handled(this,messages[i]))
        throw "unexpected:" + messages[i].toString();
    
  }  
};

exports.IsMutable = function (message){
  if(message === ""|| 
    message.indexOf("welcome") === 0 ||
     message.indexOf("what is your name?") === 0||
     message.indexOf("-----") === 0||
      message.indexOf("name:") === 0||
      message.indexOf("hit damamge:") === 0||
      message.indexOf("name:") === 0||
      message.indexOf("health:") === 0||
      message.indexOf("both players hit") === 0||
      message.indexOf("battle has ended in a draw") > -1 ||
      message.indexOf("waiting for other player")> -1 || 
      message.indexOf("has rejoined the list ") > -1)
  {
      if(!exports.muted)
        console.log("handled: " + message);
    return true;
  }
  return false;
};

exports.Handled = function (socket, message){
     if(!exports.muted)
        console.log("handled: " + message);
    if(message.indexOf("new player joined") === 0){
       
        return true;
    }
    else if(message.indexOf("who do you want to play?") === 0)
    {
        if( socket.starter )
        socket.write(socket.opp);
        return true;
    }
    else if(message.indexOf("enter move") === 0){
        if(socket.counter % 3 != 0)
            throw "not enough moves supplied!: " + socket.counter;
            socket.counter++;
        socket.write("hit");
        
        return true;
    }
    else if(message.indexOf("send next move") === 0){
         socket.counter++;
        socket.write("hit");
       
        return true;
    }
    else if(message.indexOf("who do you want to play next?") === 0)
    {
        if(socket.starter){
            console.log("starting new game: " + socket.name + " & " + socket.opp)
            socket.write(socket.opp);
        }
     return true;
    }
    else if(message.indexOf("invalid opponent") === 0){
        if( socket.starter )
        socket.write(socket.opp);
         return true;
    }
    return false;
}
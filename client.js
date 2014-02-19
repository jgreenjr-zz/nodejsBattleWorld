//client

var net = require("net");
var Readline = require("readline");
var clientConfiguration = require("./ClientConfiguration.js");
var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});

var connection = null;

console.log("Please enter IP:");
inter.once("line", ConnectPlayer);

var connection_methods = 
{
   connection_data: function (stream){console.log(stream.toString());},
   connection_end: function(){ inter.close();}
};

function interface_line(data){
   if(data.toString() == "goodbye"){
            connection.end("I'm out of here");
            inter.close();
        }
    connection.write(data);
}

function ConnectPlayer(data){
    var ip = clientConfiguration.CalculateIP(data.toString());
    console.log("Connecting to IP: "+ ip);
    connection = clientConfiguration.createClientConnection(ip, net, connection_methods); 
    inter.on("line", interface_line);
}
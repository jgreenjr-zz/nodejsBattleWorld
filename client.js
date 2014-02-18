//client

var net = require("net");
var Readline = require("readline");

var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});
  
var connection = null// net.createConnection(process.argv[2]) 




//socket.connect(process.argv[2]);


console.log("Please enter IP:");

inter.once("line", function(data){
    connection = createClientConnection(data.toString()); 
    inter.on("line", function(data){
       
        if(data.toString() == "goodbye"){
            connection.end("I'm out of here");
            inter.close();
        }
        connection.write(data);
    });
});

function createClientConnection(ip){
    
    var returnValue =null;
    if(ip != ""){
		console.log("Connecting to external Server: "+ip);
        returnValue = net.createConnection(20509, ip)
    }
    else
    {
        returnValue = net.createConnection(20509)
    }
    returnValue.on("data", function(stream){
	    console.log(stream.toString());
    });

    returnValue.on("end", function(){ inter.close();});
    return returnValue;
}
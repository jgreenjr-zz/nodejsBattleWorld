//client

var net = require("net");
var Readline = require("readline");

var inter = Readline.createInterface( {input: process.stdin,
  output: process.stdout});
  
var connection = net.createConnection(process.argv[2]) 

//socket.connect(process.argv[2]);

connection.on("data", function(stream){
	console.log(stream.toString());
});

connection.on("end", function(){ inter.close();});

inter.on("line", function(data){
	if(data.toString() == "goodbye"){
		connection.end("I'm out of here");
		inter.close();
	}
	connection.write(data);
});

var SingleGame = require("./SingleGame.js");

var counter = 0;

var t = setInterval(startGame, 2000);

function startGame(){
    counter++;
    
    SingleGame.setup("test"+ counter + "a", "test"+ counter + "b");
    
    if(counter == 20){
        clearInterval(t);
    }
}

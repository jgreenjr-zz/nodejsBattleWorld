exports.CreateManager = function (events){
 return new GameManagerObject(events);
}

function GameManagerObject(events){
    var games = [];
    this.Add = function(g){
    
    }
    
    this.length = function(){
        return games.length;
    }
}
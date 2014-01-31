exports.CreateGame = function(player1, player2){
    return new gameObject(player1, player2);
    
    
}



var gameObject = function(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.Hit = "hit";
    this.Block = "block";
    
    this.EvaluteMove = function(){
        var player1Move = this.GetNextMove(player1) ;
        var player2Move = this.GetNextMove(player2) 
        if(player1Move == this.Hit && player2Move == this.Hit){
            this.player1.health -= this.player2.hitDamage * 0.5;
            this.player2.health -= this.player1.hitDamage * 0.5;
        }
        else if(player1Move == this.Hit && player2Move == this.Block){
           this.player1.stuned = true;
        }
        else if(player1Move == this.Block && player2Move == this.Hit){
            this.player2.stuned= true;
        }
    };
    
    this.GetNextMove = function (player){
        var move = player.moves[0];
        
        var newMoves = [];
        for(var i = 1; i < player.moves.length; i++){
            newMoves.push(player.moves[i]);
        }
        player.moves = newMoves;
        
        
        return move;
    };
    
};

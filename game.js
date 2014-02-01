exports.CreateGame = function(player1, player2){
    return new gameObject(player1, player2);
    
    
}



var gameObject = function(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.Hit = "hit";
    this.Block = "block";
    this.Stuned = "stuned";
    
    this.EvaluteMove = function(){
        var player1Move = this.GetNextMove(player1) ;
        var player2Move = this.GetNextMove(player2) ;
        //console.log(player1Move + player2Move);
        if(player1Move == this.Hit && player2Move == this.Hit){
            this.player1.health -= this.player2.hitDamage * 0.5;
            this.player2.health -= this.player1.hitDamage * 0.5;
            return "Both Players hit, half damage delivered to both";
        }
        else if(player1Move == this.Hit && player2Move == this.Block){
           this.player1.stuned = true;
            return this.player1.name + " has been stuned";
        }
        else if(player1Move == this.Block && player2Move == this.Hit){
            this.player2.stuned= true;
            return this.player2.name + " has been stuned";
        }
        else if(player1Move == this.Stuned && player2Move == this.Hit){
            this.player1.health -= this.player2.hitDamage;
            return this.player1.name + " has taken damage";
        }
        else if(player2Move == this.Stuned && player1Move == this.Hit){
            this.player2.health -= this.player1.hitDamage;
            return this.player2.name + " has taken damage";
        }
        return "Neither action result in change of state";
    };
    
    this.GetNextMove = function (player){
        var move = player.stuned ? this.Stuned : player.moves[0];
        
        var newMoves = [];
        for(var i = 1; i < player.moves.length; i++){
            newMoves.push(player.moves[i]);
        }
        player.moves = newMoves;
        
        return move;
    };
};
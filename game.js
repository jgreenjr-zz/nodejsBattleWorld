exports.CreateGame = function(player1, player2){
    return new gameObject(player1, player2);
    
    
}



var gameObject = function(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.Hit = "hit";
    this.Block = "block";
    this.Stunned = "stunned";
    
    this.EvaluteMove = function(){
        var player1Move = this.GetNextMove(player1) ;
        var player2Move = this.GetNextMove(player2) ;
        if(player1Move == this.Hit && player2Move == this.Hit){
            this.player1.TakeDamage( this.player2.hitDamage * 0.5);
            this.player2.TakeDamage( this.player1.hitDamage * 0.5);
            return "Both Players hit, half damage delivered to both";
        }
        else if(player1Move == this.Hit && player2Move == this.Block){
           this.player1.stunned = true;
            return this.player1.name + " has been stunned";
        }
        else if(player1Move == this.Block && player2Move == this.Hit){
            this.player2.stunned= true;
            return this.player2.name + " has been stunned";
        }
        else if(player1Move == this.Stunned && player2Move == this.Hit){
            this.player1.TakeDamage( this.player2.hitDamage);
            return this.player1.name + " has taken damage";
        }
        else if(player2Move == this.Stunned && player1Move == this.Hit){
            this.player2.TakeDamage( this.player1.hitDamage );
            return this.player2.name + " has taken damage";
        }
        return "Neither action result in change of state";
    };
    
    this.GetNextMove = function (playerObj){
        var move = playerObj.stunned ? this.Stunned : playerObj.moves[0];
        playerObj.stunned=false;
        
        playerObj.moves.splice(0,1);
        
        if(move == "b")
            return this.Block;
        else if(move == "h")
            return this.Hit;
        
        return move;
    };
    
    this.IsOver = function(){
        return player1.health === 0 || player2.health === 0;
    }
    
    this.EvaluteAllMoves = function(){
        var results = [];
        while (player1.moves.length > 0 && !this.IsOver()) {
            results.push(this.EvaluteMove());
        }
        return results;
    }
    this.GetResults = function(){
        if(this.player1.health === 0 && this.player2.health=== 0)
            return this.player1.name + " and " + this.player2.name + "'s battle has ended in a draw";
            
        if(this.player1.health === 0)
            return this.player1.name + " has been defeated!";
            
            
        if(this.player2.health === 0)
            return this.player2.name + " has been defeated!";
            
            return "No result";
    }
};
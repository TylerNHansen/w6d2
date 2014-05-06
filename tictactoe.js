(function(root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});
  var readline = require("readline");

  var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function Board(){
    this.s1 = "_";
    this.s2 = "_";
    this.s3 = "_";
    this.s4 = "_";
    this.s5 = "_";
    this.s6 = "_";
    this.s7 = "_";
    this.s8 = "_";
    this.s9 = "_";
  };

  Board.prototype.display = function(){
    console.log(this.s7 + this.s8 + this.s9 );
    console.log(this.s4 + this.s5 + this.s6 );
    console.log(this.s1 + this.s2 + this.s3 );
  }

  Board.prototype.valid = function(pos){
    return (this[pos] === "_");
    // positions that aren't s1-s9 are undefined methods on this, and undefined
    // methods do not === "_"
  }

  // assumes valid move, pos formatted like "s4"
  Board.prototype.move = function(pos, mark){
    this[pos] = mark;
  }

  Board.prototype.allSameMark = function(pos1, pos2, pos3){
    if(this[pos1] === '_'){
      return false;
    }
    if (this[pos1] === this[pos2] && this[pos2] === this[pos3]){
      return true;
    } else {
      return false;
    }
  }

  Board.prototype.full = function() {
    for (i = 1; i < 10; i++){
      if(this['s' + i] === '_'){
        return false;
      }
    }
    return true;
  }

  Board.prototype.winner = function(){
    if (this.allSameMark('s7', 's8' , 's9')) {
      return this['s7'];
    }
    if (this.allSameMark('s4', 's5' , 's6')) {
      return this['s4'];
    }
    if (this.allSameMark('s1', 's2' , 's3')) {
      return this['s1'];
    }
    if (this.allSameMark('s7', 's4' , 's1')) {
      return this['s7'];
    }
    if (this.allSameMark('s8', 's5' , 's2')) {
      return this['s8'];
    }
    if (this.allSameMark('s9', 's6' , 's3')) {
      return this['s9'];
    }
    if (this.allSameMark('s7', 's5' , 's3')) {
      return this['s7'];
    }
    if (this.allSameMark('s9', 's5' , 's1')) {
      return this['s9'];
    }

    return false;
  }

  function HumanPlayer(playerName, mark) {
    this.playerName = playerName;
    this.mark = mark;
  }

  HumanPlayer.prototype.askMove = function(board, cb) {
    board.display();
    reader.question(this.playerName + ", enter your move: ", function(input){
      cb(input); // 's5' is valid
    });
  }

  function Game(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.board = new Board();
    this.currentPlayer = playerOne;
  }

  Game.prototype.swapPlayer = function(){
    this.currentPlayer = ((this.currentPlayer === this.playerOne) ? this.playerTwo : this.playerOne);
  }


  Game.prototype.play = function(){
    var board = this.board;
    var that = this;

    function playTurn(pos){
      if (board.valid(pos)){
        board.move(pos, that.currentPlayer.mark);
        that.swapPlayer();
      }
      if(board.full()){
        console.log("Cat's game");
        reader.close();
      } else if (board.winner()){
        console.log("Congrats");
        reader.close();
      } else {
        that.currentPlayer.askMove(board, playTurn);
      }
    }
    that.currentPlayer.askMove(board, playTurn);
  }

  p1 = new HumanPlayer('BOB LOBLAW', 'X');
  p2 = new HumanPlayer('Sterling Archer', 'O');
  g = new Game(p1, p2);
  b = new Board();

  g.play()

})(this);
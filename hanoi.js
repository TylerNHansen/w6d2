(function(root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  var Game = root.Game = (root.Game || {});
  var readline = require("readline");

  var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function Piles() {
    this.left = [4,3,2,1],
    this.mid = [],
    this.right = []
  }

  Piles.prototype.display = function(){
    console.log(this.left + ": " + this.mid + ": " + this.right )
  }

  Piles.prototype.move = function(from, to){
    // if (this[from][] > this[to]
      // assume all legal moves

    this[to].push( this[from].pop() );
  }

  Piles.prototype.valid = function(from, to){
    if (this[from].length === 0){
      return false;
    } else if (this[to].length === 0){
      return true;
    } else if (this[to].slice(-1)[0] < this[from].slice(-1)[0]){
      return false;
    } else {
      return true;
    }
  }

  Piles.prototype.won = function(){
    if(this.left.length === 0 && this.mid.length === 0){
      return true;
    } else {
      return false;
    }
  }

  //get a from, get a to, invoke callback on from and to


  function play(){

    var piles = new Piles();

    function askMove(cb){
      piles.display();
      reader.question("Which pile would you like to move from:", function(from){
        reader.question("Which pile would you like to move to:", function(to){
          cb(from, to);
        });
      });
    }

    function playTurn(from, to){
      if (piles.valid(from, to)){
        piles.move(from, to);
      }

      if (piles.won()){
        console.log("Congrats");
        reader.close;
      } else {
        askMove(playTurn);
      }
    }

    askMove(playTurn);
  }

  play();


})(this);


readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Clock(){
  this.time = new Date();
}

Clock.prototype.addFiveSeconds = function() {
  this.time.setTime(5000 + this.time.getTime());
}

Clock.prototype.display =   function() {
    console.log(this.time.getHours() + ":" + this.time.getMinutes() + ":" + this.time.getSeconds());
  }

Clock.prototype.tick = function(){
  this.addFiveSeconds();
  this.display();
}

Clock.prototype.run = function() {
  time = this.time;
  clock = this;
  setInterval(function(){
    clock.tick();
  }, 5000);
}



function addNumbers(sum, numsLeft, cb) {
  if(numsLeft > 0){
    reader.question("enter number: ", function(inStr){
      sum += parseInt(inStr);
      numsLeft--;
      addNumbers(sum, numsLeft, cb);
    })
  }
  if (numsLeft === 0){
    cb(sum);
    reader.close();
  }
}

addNumbers(0, 3, function(sum){
  console.log("the total is: " + sum);
})

(function(root) {

Function.prototype.myBind = function(obj){
  var that = this;
  return function(){
    return that.apply(obj);
  };
};

this.x = 9;
var module1 = {
  x: 81,
  getX: function() { return this.x; }
};

var module2 = {
  x: 9001
}

console.log(module1.getX()); // 81
var getX = module1.getX;
console.log(getX()); // 9, because in this case, "this" refers to the global object

// create a new function with 'this' bound to module
var boundGetX = getX.myBind(module2);
console.log(boundGetX()); // 81

})(this);
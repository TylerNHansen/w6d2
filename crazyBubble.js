var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askLessThan(el1, el2, cb) {
  reader.question("is " + el1 + " < " + el2 + " ?", function(str){
    if(str === 'y'){
      cb(true);
    } else {
      cb(false);
    }
  });
}

function performSortPass (arr, i, madeAnySwaps, callback){
  if (i<arr.length - 1){
    askLessThan(arr[i], arr[i+1], function(lessThan){
      if (lessThan === true){
        performSortPass(arr, i+1, madeAnySwaps, callback);
      }
      else{
        temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        performSortPass(arr, i+1, true, callback);
      };
    }); //closes anon function
  } else {
    callback(madeAnySwaps);
  }
}


function crazyBubbleSort(arr, sortCompCB){
  function sortPassCB(madeSwap){
    if(madeSwap){
      performSortPass(arr, 0, false, sortPassCB);
    } else {
      sortCompCB(arr);
    }
  }

  sortPassCB(true);
}

crazyBubbleSort([5,4,1,3], function(arr){
  console.log(arr);
});

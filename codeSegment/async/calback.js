console.log(Date.now());
setTimeout(
  function() {
    console.log(Date.now());
  }
, 1000);
console.log(Date.now());
let now = Date.now();
while(true){
    let cur = Date.now();
    if(cur - now > 3000){
        break;
    }
}

let queue = []
while(true){
    let a = queue.shift();
    a && a();
    
}
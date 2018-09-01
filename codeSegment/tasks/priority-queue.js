function Queue(arr) {
  this.arr = arr;
}

Queue.prototype.sort = function () {
  this.arr = this.arr.sort(function (a, b) {
    return a - b
  });
}

Queue.prototype.popTwo = function () {
  let a, b, arr = this.arr;
  a = arr.shift();
  b = arr.shift();
  return [a, b];
};

Queue.prototype.insertSort = function (value) {
  for(let i = 0; i < this.arr.length; i++){
    if(this.arr[i] <= value && value <= this.arr[i + 1]){
      this.arr.splice(i + 1, 0, value);
      return;
    }
  }
};

Queue.prototype.getSum = function () {
  let sum = 0;
  this.arr.map(v => {
    sum += v;
  });
  return sum;
};

let arr = [ 1, 2, 3, 4, 4, 6, 4, 9, 7, 6, 454, 546, 65, 654, 67, 5, 4, 45435, 4, 43, 657 ];
let q = new Queue(arr);
let sum;
q.sort();
/*while(q.arr.length > 1){

}*/
console.log(q.arr)
q.insertSort(66)
console.log(q.arr)

function Node(value) {
  this.value = value;
}
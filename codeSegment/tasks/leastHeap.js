function LeastHeap(arr) {
  this.arr = arr;
  this.len = arr.length;
}

LeastHeap.prototype.swap = function (index1, index2) {
  let arr = this.arr;
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index1] = temp;
};

LeastHeap.prototype.leftChild = function (index) {
  return this.arr[index * 2 + 1];
};
LeastHeap.prototype.rightChild = function (index) {
  let child = index * 2 + 2;
  if(child < this.len){
    return this.arr[child];
  }
};

LeastHeap.prototype.siftDown = function (index) {
  let small, flag = 0;
  let arr = this.arr;
  while(index * 2 < this.len && flag === 0){
    if(arr[index] < this.leftChild(index)){
      small = index;
    }
    else small = index * 2 + 1;

    if(arr[small] > this.rightChild(index)){
      small = index * 2 + 2;
    }

    if(small !== index){
      this.swap(small, index);
      index = small;
    }
    else flag = 1;
  }
};

LeastHeap.prototype.create = function () {
  let i, len = this.len;
  for(i = Math.floor(len / 2); i > 0; i--){
    this.siftDown(i);
  }
};

LeastHeap.prototype.sort = function () {
  let len = this.len;
  while (len > 1){
    this.swap(0, len);
    len--;
    this.siftDown(0);
  }
};


function randomArr(number) {
  let random, res = [];
  for(let i = 0; i < number; i++){
    random = Math.floor(Math.random() * 10);
    res.push(random);
  }
  return res;
}

let arr = randomArr(10);


let heap = new LeastHeap(arr);

heap.create();
heap.sort();
let a1 = heap.arr
console.log(arr)
console.log(a1)
/*
for(let i=0;2*i<a1.length;i++){
  console.log(a1[i], " ", a1[2*i + 1], " ", a1[2*i+2]," ", a1[2*(2*i+2)], )
}*/

function AdjustHeap(arr, pos, len){
  var swap = arr[pos];      //保存当前节点
  var child = pos * 2 + 1;  //定位到当前节点的左边的子节点
  while(child < len){       //递归遍历所有的子节点
                            //判断当前节点是否有右节点，若右节点较大，就采用右节点和当前节点进行比较
    if(child + 1 < len && arr[child] < arr[child + 1]){
      child += 1;
    }
    //比较当前节点和最大的子节点，小于就交换，交换后将当前节点定位到子节点上
    if(arr[pos] < arr[child]){
      arr[pos] = arr[child];
      pos = child;
      child = pos * 2 + 1;
    }
    else{
      break;
    }
    arr[pos] = swap;
  }
}


function BuildHeap(arr){
  for(var i=arr.length/2; i>=0; i--){  //构建打顶堆
    AdjustHeap(arr, i, arr.length);
  }
}


function HeapSort(arr){
  BuildHeap(arr);
  for(var i=arr.length-1; i>0; i--){   //从数组的尾部进行调整
    var swap = arr[i];  //堆顶永远是最大的元素,将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
    arr[i] = arr[0];
    arr[0] = swap;
    AdjustHeap(arr, 0, i); //将最大的元素进行调整，将最大的元素调整到堆顶
  }
}

function randomArr(number) {
  let random, res = [];
  for(let i = 0; i < number; i++){
    random = Math.floor(Math.random() * 50);
    res.push(random);
  }
  return res;
}

let arr = randomArr(10);
console.log('before: ' + arr);
HeapSort(arr);
console.log(' after: ' + arr);
arr.push(35);
HeapSort(arr)
console.log(arr)
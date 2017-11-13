function merge(arr, start, end, less) {
  let len = end - start + 1;
  //console.log(start, end, len)
  if (len > 2) {
    let mid = Math.floor((start + end) / 2);
    merge(arr, start, mid, less);
    merge(arr, mid, end, less);
    let i = start, j = mid, curValue = arr[ start ];
    let tempArr = [];
    while (i < mid && j < end) {
      if (less(arr[ i ], arr[ j ])) {
        tempArr.push(arr[ i ]);
        i += 1;
      } else {
        tempArr.push(arr[ j ]);
        j += 1;
      }
    }
    if (i < mid) {  //j 先到头
      let last = end - 1;
      for (let p = mid - 1; p >= i; p--, last--) {
        arr[ last ] = arr[ p ];
      }
      for (let k = 0, l = tempArr.length; k < l; k++) {
        arr[ start + k ] = tempArr[ k ];
      }
      //console.log('temp: ', tempArr)
    } else {  //i 先到头
      for (let k = 0, l = tempArr.length; k < l; k++) {
        arr[ start + k ] = tempArr[ k ];
      }
    }
  }
  if (len === 2) {
    if (less(arr[ end ], arr[ start ])) {
      arr.swap(start, end);
    }
  }
}

let defaultLess = function (a, b) {
  return a < b;
}

function runMerge(arr, less = defaultLess) {
  merge(arr, 0, arr.length, less)
  return arr;
}

Array.prototype.swap = function (i, j) {
  let temp = this[ i ];
  this[ i ] = this[ j ];
  this[ j ] = temp;
}


function randomArr() {
  let a = []
  for (i = 0; i < 1000000; i++) {
    let random = Math.random() * 100
    a.push(Math.floor(random))
  }
  return a;
}

let arr = randomArr()
console.time('merge');
let res = runMerge(arr)
console.timeEnd('merge')

console.time('sort');
arr.sort()
console.timeEnd('sort')
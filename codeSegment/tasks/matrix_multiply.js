
function matrix_mult(arr) {
  let length = arr.length;
  let min = [];
  let res = [];

  for(let i = 0; i <= length; i++){
    min[i] = [];
    res[i] = [];
    for(let j = 0; j < length; j++){
      min[i][j] = 0;
      res[i][j] = 0;
    }
  }

  for(let i = 1; i < length; i++){
    for(let j = 0; j < length - i + 1; j++){
      let k = i + j -1;
      min[j][k] = min[j + 1][k] + arr[j - 1] * arr[j] * arr[k];
      res[j][k] = j;
      for(let p = j + 1; p < k; p++){
        let m = min[j][p] + min[p + 1][k] + arr[j - 1] * arr[p] * arr[k];
        if(m < min[j][k]){
          min[j][k] = m;
          res[j][k] = p;
        }
      }
    }
  }

  console.log(min)
  console.log(res)

  trackBack(0, length-1, res);
}

function trackBack(i, j, resArr) {
  if(i === j){
    return;
  }

  trackBack(i, resArr[i][j], resArr);
  trackBack(resArr[i][j] + 1, j, resArr);
  console.log("Matrix", i, resArr[i][j])
  console.log("and A", resArr[i][j] + 1, j);
}

function randomArr(len) {
  let a = []
  for (i = 0; i < len; i++) {
    let random = Math.random() * 10 + 1
    a.push(Math.floor(random))
  }
  return a;
}

let a = randomArr(15)
matrix_mult(a)

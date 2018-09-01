function Obj(id, weight, price) {
  this.id = id;
  this.weight = weight;
  this.price = price;
  this.ratio = price / weight;
}

let getRandomObj = function() {
  let autoId = 0;
  return function () {
    let w = Math.floor(Math.random() * 100) + 1;
    let p = Math.floor(Math.random() * 100) + 1;

    return new Obj(autoId++, w, p)
  }
}();

function getObjs(number) {
  let res = [];
  for(let i = 0; i < number; i++){
    res.push(getRandomObj())
  }
  return res;
}

function getZeroArr(len) {
  return [...new Array(len)].map(_ => 0);
}


let objs = getObjs(10);
//console.log(objs);

function packageProb(maxWeight, objArr) {
  let sorted = objArr.sort(function (a, b) {
    return a.ratio - b.ratio;
  });
  let total = 0;
  let res = getZeroArr(objArr.length);
  for(let i = 0, len = sorted.length; i < len; i++){
    let curWeight = sorted[i].weight;
    total += curWeight;
    if(total <= maxWeight){
      res[i] = 1;
    } else {
      total -= curWeight;
      res[i] = (maxWeight - total) / curWeight;
      break;
    }
  }
  return res;
}

let res = packageProb(500, objs);
console.log(res);
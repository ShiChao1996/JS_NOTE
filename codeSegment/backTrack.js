/*
//backtrack general method
function backTrack(root){
  if(root === target){
    root.success = true;
    return;
  }
  if(!root.children){
    root.success = false;
    return;
  }
  root.children.map((child) => {
    backTrack(child);
  });
  if(root.children.some((child) => child.success === false)){
    root.success = false;
    return;
  }
  root.success = true;
}*/

//n-queens
function run(number) {
  var arr = [];
  for(let i = 0; i < number; i++){
    arr.push({id: i})
  }
  console.log(arr)

  var queen = function(arr, pathArr = []) {
    if(pathArr.length === number){
      console.log(pathArr);
      return;
    }
    for(let i = 0, length = arr.length; i < length; i++){
      let cur = arr[i].id;
      let pre = i === 0 ? -2 : arr[i - 1].id;
      pathArr.push(cur);
      nextArr = arr.filter((val) => {
        if(val.id === pre || Math.abs(val.id - pre) < 2){
          return false;
        }
        return true;
      });

      queen(nextArr, pathArr);
      pathArr.pop();
    }
  }

  queen(arr);
}

run(4)
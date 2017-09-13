/**
 * Created by lovae on 2017/9/13.
 */

// 多维数组扁平化，并且去掉重复元素

var arr = [[1,2,2],[3, 4, 5, 5],[6, 7, 8, 9,[11,12,[12,13,[14]]]],10];

function flatArr(arr) {
    let newArr = []
    let flat = function (array, newArr) {
        array.map(ele => {
            if(ele instanceof Array){
                flat(ele, newArr);
                return;
            }
            if(newArr.indexOf(ele) !== -1){
                return;
            }
            newArr.push(ele);
        })
    }
    flat(arr, newArr);
    return newArr
}

console.log(flatArr(arr))

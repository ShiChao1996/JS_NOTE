/**
 * Created by lovae on 2017/9/13.
 */

// 多维数组扁平化


var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10, {a: 'dfasd'}];

// 递归处理,最麻烦但是兼容性最好，不论几维数组都OK
function flatArr(arr) {
    let newArr = []
    let flat = function (array, newArr) {
        array.map(ele => {
            if (ele instanceof Array) {
                flat(ele, newArr);
                return;
            }
            newArr.push(ele);
        })
    }
    flat(arr, newArr);
    return newArr
}


// 借用concat
function flatArr_1(arr) {
    return [].concat.apply([], arr)
}


// 扩展运算符
function flatArr_2(arr) {
    return [].concat(...arr)
}

// toString   缺点：不能自包含，不能有对象元素

function flatArr_3(arr) {
    let res = arr.toString().split('')
}

// reduce

function flatArr_4(arr) {     //  思路和递归一样， 不过用storage代替了额外变量 newArr
    return arr.reduce(function callee(storage, item) {
        if (item instanceof Array) {
            item.reduce(callee, storage);
        } else {
            storage.push(item);
        }
        return storage;
    }, []);
}

// generate
var result = function* callee(arr) {
    for (let item of arr) {
        if (item instanceof Array) {
            yield* callee(item);
        } else {
            yield item;
        }
    }
    ;
}(arr);

console.log([...result])


// 循环
function flatArr_5(arr) {
    while (arr.some(item => item instanceof Array)){
        arr = [].concat(...arr);
    }
    return arr;
}

// JSON.stringify 包含对象有些许问题
function flatArr_6(arr) {
    let result = []
    JSON.stringify(arr, function(key) {
        let value = this[key];
        if (!(value instanceof Array)) result.push(value);
        return value;
    })
    return result;
}


//console.log(arr)
console.log(flatArr_6(arr))
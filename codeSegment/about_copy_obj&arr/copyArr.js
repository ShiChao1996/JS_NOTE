/**
 * Created by lovae on 2017/9/11.
 */


let src = [1, 2, 3, 4, 5, 6, 7, 8, undefined, {a: 1, b: 2}]
src[10] = src

//浅拷贝：
let tar = src.slice();
let tar1 = src.map(_ => _)
let tar2 = src.concat()
let tar3 = Array.from(src)

let temp = []
let tar4 = Array.prototype.push.apply(temp, src)        //seems to have some problems
let tar5 = [...src]

// 深拷贝
//method 1
let target = JSON.parse(JSON.stringify(src))
// 对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。
// 还有一点不好的地方是它会抛弃对象的constructor。也就是深拷贝之后，
// 不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object。
// 同时如果对象中存在循环引用的情况也无法正确处理
// 另外，undefined 会变成 null

//method 2
let copy = require('./deepCopy')
let target1 = copy(src)

console.log(src, target1)

//method 3
function deepCopy(arry1, arry2){
    var tempArry =[];
    for(var i = 0,l= arry1.length;i<l;i++) {
        //判断每一项是不是一个数组
        if (arry1[i] instanceof Array ) {
            deepCopy(arry1[i], tempArry)
            arry2[i] = tempArry;
        }
        else {
            arry2[i] = arry1[i];
        }
    }
}

var b = [[1,2,3],4,5];
var c = [[1,[2,3]],4,5];
var d = [[1,2,3],4,[5,6,7]];
var deepArray = [];

deepCopy(b, deepArry);
console.log(deepArry);
deepArry[0][0] =9;   //修改deepArry的值
console.log(b);
console.log(deepArry);

deepArry.length=0;   //初始化deepArray
deepCopy(d,deepArry);
console.log(deepArry);

deepArry.length=0;
deepCopy(c,deepArry);
console.log(c);
console.log(deepArry);
deepArry[0][1][0] = 99;
console.log(c);
console.log(deepArry);
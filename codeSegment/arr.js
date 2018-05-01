/**
 * Created by lovae on 2018/05/01.
 */

//  best
// let arr = [2,3,34,5,4,4,65,656,6,765,7]
// function f1(arr){
//     return [...new Set(arr)];
// }
// console.log(f1(arr));

// let arr = [10,22,32,423,42,34,534,1,22,1,22,32,]
// function f2(arr){
//     let array = [];
//     for(let i = 0; i < arr.length; i++) {
//         if(arr.indexOf(arr[i]) === i) { // 对比这个元素出现的首次索引和当前索引
//             array.unshift(arr[i]);
//         }
//     }
//     return array;
// }

// function f3(arr){
//     let array = [];
//     for(let i = 0; i < arr.length; i++) {
//         if(array.indexOf(arr[i]) === -1) { 判断当前元素是否在新数组中
//             array.push(arr[i]);
//         }
//     }
//     return array;
// }



// function f4(arr){
//     let obj = {};
//     for(let i = 0; i < arr.length; i++) {
//         if(obj[arr[i]] === undefined) { 判断该数组元素是不是对象的属性名
//             obj[arr[i]] = 0;
//         }
//     }
//     return Object.keys(obj); 输出对象的所有可枚举属性
// }

// console.log(f4(arr));

// f();
// function f() {
//     let a = 0;
//     console.log(a);
//     if(true){
//         console.log(a);
//         let a = 9;
//     }
// }

// 0
// ReferenceError not defined

// f(1);
// function f(a) {
//     console.log(a);
//     var a;
// }

// 1

// f(1);
// function f(a) {
//     console.log(a);
//     var a = 0;
//     console.log(a);
// }

// 1
// 0

// f(1);
// function f(a) {
//     console.log(a);
//     let a = 0; // const a = 0;
//     console.log(a);
// }

// SyntaxError declared

// function f() {
//     var a = 0;
//     function l() {
//         var a = 2;
//         function m() {
//             console.log(a);
//         }
//         m();
//     }
//     l();
// }
// f();

// 2

// function f() {
//     var a = 0;
//     function l() {
//         function m() {
//             console.log(a);
//         }
//         m();
//         var a = 2;
//     } 
//     l();
// }
// var a = 1;
// f();
// console.log(a);

// undefined
// undefined

// var a = 4;
// (function I( def ) {
//     def(2);
//     console.log(1);
// })(function def(global) {
//     var a = 3;
//     console.log(a);
//     console.log(global);
// })

// 3
// 2
// 1

// function foo() {
//     console.log(a);
// }
// function bar() {
//     var a = 3;
//     foo();
// }
// var a = 2;
// bar();

// 2
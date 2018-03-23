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
/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/04/04        ShiChao
 */

// this is a wrong way to inherits Date
// see https://segmentfault.com/a/1190000012841509
// only Date obj can invoke func of Date, that is the caller must be an instance of Date
// this is why we did "inherits" Date, and MyDate do have getTime in its __proto__ ,but can't invoke it.
/*
const inherits = require('./inherits').inherits;

function MyDate() {
  this.name = "my date class"
}

inherits(MyDate, Date);

let myDate = new MyDate();
myDate.getTime(); // TypeError: this is not a Date object.

*/


// we can do it like this, use ES5:
 function MyDate1() {
   let date = new Date();
   Object.setPrototypeOf(date, MyDate1.prototype);

   return date;
 }

 MyDate1.prototype.say = function () {
   console.log("hello MyDate")
 };

 Object.setPrototypeOf(MyDate1.prototype, Date.prototype);

 let d = new MyDate1(); // what we get here is an instance of Date
 d.say();
 console.log(d.getTime());
// what we actually do here is to insert an __proto__ into Date's protoChain


// also we can use ES6, which is convenient:
class MyDate2 extends Date{
  constructor() {
    super();
  }
  say() {
    console.log("this is es6 way");
  }
}
let md = new MyDate2();
md.say();
console.log(md.getTime());
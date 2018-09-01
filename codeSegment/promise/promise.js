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

const pending = 0;
const fullfilled = 1;
const rejected = 2;

function MyPro(func) {
  this.state = pending;
  this.value = null;
  this.callbacks = [];

  func && func(this.resolve.bind(this))
}

MyPro.prototype.then = function (onfullfill) {
  let value = this.value;
  console.log("this ", this);

  return new MyPro(function (resolve) {
    if (this.state === pending) {
      this.callbacks.push(onfullfill);
      return this;
    }
    let res = onfullfill(value);
    //resolve(res)
  });
};

MyPro.prototype.resolve = function (value) {
  /*if(value instanceof MyPro){
    //value.resolve(value.value);
    //value.then(value.value,value.resolve())
    console.log("this is return pro")
    return;
  }*/

  this.state = fullfilled;
  this.value = value;
  console.log('value: ', value);
  process.nextTick(() => {
    this.callbacks.forEach((cb) => {
      let res = cb(value);
      this.resolve(res);
    })
  });
};


let p = new MyPro(function (resolve) {
  resolve(1);
});
let p1 = p.then((a) => {
  console.log("a: ", a);
  return new MyPro(function (resolve) {
    resolve(3)
  })
});
let p2 = p1.then((a) => {
  console.log("second ", a);
  return "done"
});

console.log("p0", p)
console.log("p1", p1)
console.log("p2", p2)

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

function b() {
  throw(new Error("this is a err"))
}

/*
* we can't catch err directly when the func is in an async callback
* */
function a() {
  try {
    setTimeout(b, 1000);
  } catch (e) {
    console.log('hjhjhj') // not exec
  }
}

//a();


/*
* one way to catch is convert it to Promise
* */
let p = new Promise(function (resolve, reject) {
  setTimeout(resolve(), 1000);
});
p.then(() => b()).catch(console.log('hjhjhj'));


/*
* event is still a way
* */
/*
let events = require("events");
let emitter = new events.EventEmitter();
emitter.addListener("error", function (e) {
  console.log(e.message)
});
emitter.emit("error", new Error('wrong'));
*/


/*
* domain is also a good way
* */
/*
let domain = require('domain')
let d = domain.create()
d.on('error', function (e) {
  console.log(e.message)
})
d.run(asyncError)
d.run(syncError)
*/

/*
* also we can use async and await.
* note that this works but it block the thread if we invoke like this: await c();
* we can invoke without "await" keyword so that it can run in a "backend" thread
* */
/*async function c() {
  try {
    await P(); // providing P() returns a Promise and it's rejected
  } catch (e) {
    console.log('hjhjhj') // now exec
  }
}
c()*/


/*
* and for common use, we can create a func like background
* */
/*
async function background(asyncFunc, args...) {
  try {
    await asyncFunc(...args); // providing P() returns a Promise and it's rejected
  } catch (e) {
    // do something...
  }
}
*/



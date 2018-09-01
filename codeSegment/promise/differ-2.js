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
 *     Initial: 2018/03/22        ShiChao
 */

/*
setTimeout(function() {
  console.log('timeout1');
  process.nextTick(function() {
    console.log('timeout1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function() {
    console.log('timeout1_then')
  })
})

setImmediate(function() {
  console.log('immediate1');
  process.nextTick(function() {
    console.log('immediate1_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function() {
    console.log('immediate1_then')
  })
})


setTimeout(function() {
  console.log('timeout2');
  process.nextTick(function() {
    console.log('timeout2_nextTick');
  })
  new Promise(function(resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function() {
    console.log('timeout2_then')
  })
})*/

/*

setImmediate(function() {
  console.log('immediate2');
  process.nextTick(function() {
    console.log('immediate2_nextTick');
  })
  new Promise(function(resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function() {
    console.log('immediate2_then')
  })
})
*/

setImmediate(function () {
  console.log("im 1")
  process.nextTick(function() {
    console.log('timeout1_nextTick');   // 13
  })
});

setImmediate(function () {
  console.log("im 2")
})
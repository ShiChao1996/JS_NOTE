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
 *     Initial: 2018/03/21        ShiChao
 */

var count = 1;
function print(str) {
  console.log(count, str)
  count += 1;
}

print('golb1');   // 1

setTimeout(function() {
  print("timeout1");   // 8
  process.nextTick(function() {
    print('timeout1_nextTick');   // 12
  })
  new Promise(function(resolve) {
    print('timeout1_promise');   // 9
    resolve();
  }).then(function() {
    print('timeout1_then')   // 14
  })
})

setImmediate(function() {
  print('immediate1');   // 16
  process.nextTick(function() {
    print('immediate1_nextTick');   // 20
  })
  new Promise(function(resolve) {
    print('immediate1_promise');   // 17
    resolve();
  }).then(function() {
    print('immediate1_then')   // 22
  })
})

process.nextTick(function() {
  print('glob1_nextTick');   // 4
})

new Promise(function(resolve) {
  print('glob1_promise');   // 2
  resolve();
}).then(function() {
  print('glob1_then')   // 6
})

setTimeout(function() {
  print('timeout2');   // 10
  process.nextTick(function() {
    print('timeout2_nextTick');   // 13
  })
  new Promise(function(resolve) {
    print('timeout2_promise');   // 11
    resolve();
  }).then(function() {
    print('timeout2_then')   // 15
  })
})

process.nextTick(function() {
  print('glob2_nextTick');   // 5
})

new Promise(function(resolve) {
  print('glob2_promise');   // 3
  resolve();
}).then(function() {
  print('glob2_then')   // 7
})

setImmediate(function() {
  print('immediate2');   // 18
  process.nextTick(function() {
    print('immediate2_nextTick');   // 21
  })
  new Promise(function(resolve) {
    print('immediate2_promise');   // 19
    resolve();
  }).then(function() {
    print('immediate2_then')   // 23
  })
})


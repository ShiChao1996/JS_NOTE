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
 *     Initial: 2018/04/03        ShiChao
 */

function MyPromise(task) {
  const _this = this;
  _this.status = 'pending';  //设定初始状态
  _this.value = undefined;
  _this.onFulfilledsList = [];  //onFulfilled函数序列
  _this.onRejectedsList = [];  //onRejected函数序列

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    //异步执行resolve或reject方法，保证代码的统一性和注册的回调函数按照正确的顺序执行
    if (_this.status === 'pending') {
      _this.status = 'fulfilled';
      _this.value = value;
      _this.onFulfilledsList.forEach(cb => cb(value))
    }
  }

  function reject(reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected';
      _this.reason = reason;
      _this.onRejectedsList.forEach(cb => cb(reason))
    }
  }

  try {
    task(resolve, reject);
  } catch (err) {
    throw new Error(err);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('循环引用'));
  }
  //如果返回的是一个thenable对象，即一个拥有then方法的对象，那么使用它的then方法去获得它的最终返回值。目的是为了兼容其他Promise库
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then, called;
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, function (newx) {
          if (called) return;   //防止重复调用
          called = true;
          resolvePromise(promise2, newx, resolve, reject);
        }, function (err) {
          if (called) return;
          called = true;
          return reject(err);
        });
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this;
  let promise2;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (data) {
    return data;
  };
  onRejected = typeof onRejected === 'function' ? onRejected : function (data) {
    throw data;
  };
  //为了支持同步代码，当then方法注册的时候如果Promise的状态已经改变，那么立即执行对应的函数
  if (_this.status === 'fulfilled') {
    promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        let x;
        try {
          x = onFulfilled(_this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      })
    })
  }
  if (_this.status === 'rejected') {
    promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        let x;
        try {
          x = onRejected(_this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      })
    })
  }
  if (_this.status === 'pending') {
    promise2 = new MyPromise(function (resolve, reject) {
      _this.onFulfilledsList.push(function (value) {
        setTimeout(function () {
          let x;
          try {
            x = onFulfilled(value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      });
      _this.onRejectedsList.push(function (reason) {
        setTimeout(function () {
          try {
            let x = onRejected(reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      });
    })
  }
  return promise2;  //返回一个新的Promise实例，以便支持链式调用
};

MyPromise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
};

MyPromise.all = function (someValue) {
  let resolveValArr = [];
  let count = promiseLen = 0;
  let promise2;
  promise2 = new MyPromise(function (resolve, reject) {
    let iNow = 0;
    try {
      for (let item of someValue) {
        if (item !== null && typeof item === "object") {
          try {
            let then = item.then;
            let index = iNow;
            if (typeof then === 'function') {
              promiseLen++;
              then.call(item, function (value) {
                resolveValArr[index] = value;
                if (++count === promiseLen) {
                  resolve(resolveValArr)
                }
              }, function (err) {
                reject(err);
              });
            }
          } catch (err) {
            resolveValArr[iNow] = item;
          }
        } else {
          resolveValArr[iNow] = item;
        }
        iNow++;
      }
      if (iNow === 0) {
        return resolve(someValue);
      }
      if (promiseLen === 0) {
        return resolve(resolveValArr);
      }
    } catch (err) {
      reject(new TypeError('无法遍历的类型!'));
    }
  });
  return promise2;
};


MyPromise.race = function (someValue) {
  let promise2;
  promise2 = new MyPromise(function (resolve, reject) {
    let iNow = 0;
    try {
      for (let item of someValue) {
        if (item !== null && typeof item === "object") {
          try {
            let then = item.then;
            then.call(item, function (value) {
              resolve(value);
            }, function (err) {
              reject(err);
            });
          } catch (err) {
            resolve(item);
            break;
          }
        } else {
          resolve(item);
          break;
        }
        iNow++;
      }
      if (iNow === 0) {
        return resolve(someValue);
      }
    } catch (err) {
      reject(new TypeError('无法遍历的类型!'));
    }
  });
  return promise2;
};
MyPromise.resolve = function (value) {
  let promise2;
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    promise2 = new MyPromise(function (resolve, reject) {
      try {
        let then = value.then;
        if (typeof value.then === 'function') {
          then.call(value, function (data) {
            resolve(data);
          }, reject);
        } else {
          resolve(value);
        }
      } catch (err) {
        reject(err);
      }
    })
  } else {
    promise2 = new MyPromise(function (resolve) {
      resolve(value);
    })
  }
  return promise2;
};
MyPromise.reject = function (reason) {
  return new MyPromise(function (resolve, reject) {
    reject(reason);
  })
};
module.exports = MyPromise;

//这是为了让代码能够测试而开放的接口，详见promises-aplus-tests中的相关描述
MyPromise.deferred = MyPromise.defer = function () {
  let deferred = {};
  deferred.promise = new MyPromise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred
};

let p = new MyPromise(function (res, rej) {
  res(1)
})
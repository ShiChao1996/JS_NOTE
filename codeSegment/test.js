/**
 * Created by see on 8/2/17.
 */


/*

 var something = (function(){
 var nextVal;

 return {
 // `for..of`循环需要这个
 [Symbol.iterator]: function(){console.log('this: ',this); return this; },

 // 标准的迭代器接口方法
 next: function(){
 if (nextVal === undefined) {
 nextVal = 1;
 }
 else {
 nextVal = (3 * nextVal) + 6;
 }

 return { done:false, value:nextVal };
 }
 };
 })();

 for (var v of something) {
 console.log(v)
 }

 */



/*
 function *something() {
 var nextVal;

 while (true) {
 if (nextVal === undefined) {
 nextVal = 1;
 }
 else {
 nextVal = (3 * nextVal) + 6;
 }

 yield nextVal;
 }
 }

 for(let i of something()){
 console.log(i)
 }
 */

/*

 function *something() {
 try {
 var nextVal;

 while (true) {
 if (nextVal === undefined) {
 nextVal = 1;
 }
 else {
 nextVal = (3 * nextVal) + 6;
 }

 yield nextVal;
 }
 }
 // 清理用的从句
 finally {
 console.log( "cleaning up!" );
 }
 }


 var it = something();
 for (var v of it) {
 console.log( v );

 // 不要让循环永无休止！
 if (v > 500) {
 console.log(
 // 使generator得迭代器完成
 it.return( "Hello World" ).value
 );
 // 这里不需要`break`
 }
 }*/




/*
 var fs = require('fs')

 function foo(x,y) {
 fs.readFile(
 "./mainn.js",
 function(err,data){
 if (err) {
 // 向`*main()`中扔进一个错误
 it.throw( err );
 }
 else {
 // 使用收到的`data`来继续`*main()`
 let aa = it.next( data );
 console.log("fdsdsfsadfsdfsaf: ",aa)
 }
 }
 );
 return 'hhhhhhh'
 }

 function *main() {
 try {
 var text = yield foo( 11, 31 );
 console.log( text );
 }
 catch (err) {
 console.error( err );
 }
 return 'lovae'
 }

 var it = main();
 // 使一切开始运行！
 let re2 = it.next();

 console.log('re2: ', re2)

 */



/*

 function *main() {
 var x = yield "Hello World";

 // 永远不会跑到这里
 console.log( x );
 }

 var it = main();

 it.next();

 try {
 // `*main()`会处理这个错误吗？我们走着瞧！
 it.throw( "Oops" );
 }
 catch (err) {
 // 不，它没处理！
 console.log('hhhhhhhh')
 console.error( err );			// Oops
 }

 */



// 感谢Benjamin Gruenbaum (@benjamingr在GitHub)在此做出的巨大改进！
/*
 function run(gen) {
 var args = [].slice.call( arguments, 1), it;

 // 在当前的上下文环境中初始化generator
 it = gen.apply( this, args );

 // 为generator的完成返回一个promise
 return Promise.resolve()
 .then( function handleNext(value){
 // 运行至下一个让出的值
 var next = it.next( value );

 return (function handleResult(next){
 // generator已经完成运行了？
 if (next.done) {
 return next.value;
 }
 // 否则继续执行
 else {
 return Promise.resolve( next.value )
 .then(
 // 在成功的情况下继续异步循环，将解析的值送回generator
 handleNext,

 // 如果`value`是一个拒绝的promise，就将错误传播回generator自己的错误处理g
 function handleErr(err) {
 return Promise.resolve(
 it.throw( err )
 )
 .then( handleResult );
 }
 );
 }
 })(next);
 } );
 }

 */


/*
 function thunkify(fn,a,b) {
 var args = [].slice.call( arguments);
 console.log(args)
 return function(cb) {
 args.push( cb );
 return fn.apply( null, args );
 };
 }

 //var fooThunk = thunkify( foo, 3, 4 );



 // 稍后

 thunkify(function () {

 },1,2)*/

/*

 function foo(something) {
 console.log( this.a, something );
 return this.a + something;
 }

 // 简单的 `bind` 帮助函数
 function bind(fn, obj) {
 return function() {
 return fn.apply( obj, arguments );
 };
 }

 var obj = {
 a: 2
 };

 var bar = bind( foo, obj );

 var b = bar( 3 ); // 2 3
 console.log( b ); // 5*/



/*function foo() {
 return this
 }*/

/*
 var a = 2;
 /!*
 var o = { a: 3, foo: foo };
 var p = { a: 4 };

 o.foo(); // 3
 *!/

 //console.log(global === (p.foo = o.foo)()); // 2
 //console.log('this: ', global)

 console.log(this.a)*/

// const URL = require('url');
// const crypto = require('crypto');
//
// let a = encodeURIComponent('https://sts.aliyuncs.com/?SignatureVersion=1.0&Format=JSON&RoleArn=acs:ram::1042201469700617:role/aliyundmsdefaultrole&RoleSessionName=ryan&AccessKeyId=LTAIIbhcULjHes92&SignatureMethod=HMAC-SHA1&Version=2015-04-01&Action=AssumeRole&Timestamp=2017-08-06 11:04:08.228861309 +0000 UTC&SignatureNonce=779303&Signature=9sOsoVuazJ3bLpwT9kO+OGmM4Vs=')
// console.log(a)


/*
 class AliyunUtils {

 /!**
 * URL 签名
 * @param url URL
 * @param appSecret AppSecret
 * @returns {string} 签名结果
 *!/
 static signatureURL(url, appSecret) {
 let query = URL.parse(url).query;
 let params = query.split('&');
 for (let param of params) {
 let components = param.split('=');
 param = `${encodeURIComponent(components[0])}=${encodeURIComponent(components[1])}`;
 }
 params.sort();
 let stringToSign = `GET&%2F&${encodeURIComponent(params.join('&'))}`;
 return crypto.createHmac('sha1', appSecret).update(stringToSign).digest('base64');
 }

 /!**
 * 头部签名
 * @param bucket
 * @param options
 * @param appSecret
 *!/
 static signatureHeaders(bucket, options, appSecret) {
 options.method = options.method || 'GET';
 options.headers['Content-MD5'] = options.headers['Content-MD5'] || '';
 options.headers['Content-Type'] = options.headers['Content-Type'] || '';
 options.headers['Date'] = options.headers['Date'] || new Date().toUTCString();

 let ossHeader = '';
 let headers = [];

 Object.keys(options.headers).forEach((it) => {
 if (/x-oss-/i.test(it)) {
 headers.push(it);
 }
 });

 headers = headers.sort(function (a, b) {
 let lA = a.toLowerCase();
 let lB = b.toLowerCase();
 return lA.localeCompare(lB);
 });

 headers.forEach((it) => {
 ossHeader += `${it.toLowerCase()}:${options.headers[it]}\n`;
 });

 let resources = `/${bucket}${decodeURI(options.path)}`;
 let content = `${options.method}\n${options.headers['Content-MD5']}\n${options.headers['Content-Type']}\n${options.headers['Date']}\n${ossHeader}${resources}`;
 return crypto.createHmac('sha1', appSecret).update(content).digest('base64');
 }

 }

 module.exports = AliyunUtils;*/

/*
 function NothingSpecial() {
 NothingSpecial.d = 9
 var aa = 0
 console.log( "Don't mind me!" );
 }

 var a = new NothingSpecial();
 // "Don't mind me!"

 a; // {}
 console.log(a)*/

/* Number.prototype.a = 9
 console.log(1..a)
 console.log(0 .a)*/

/*
 let a = 3 * 'b'
 console.log(a)
 console.log(typeof a)

 console.log((0/-90).toString())
 */


/*

 function foo(x) {
 console.log('x: ', x)
 x = x + 1;
 x; // 3
 console.log(x)
 }

 var a = 2;
 var b = new Number( a ); // 或等价的 `Object(a)`

 foo( b );
 console.log( b ); // 2, 不是 3

 */

/*
let a = {
  b: 0,
  c: 3,
  f: "fdkajd"
}


let b = new Object({})
console.log(b)
for (let i in a) {
  b[i] = a[i]
}


b.b = 888

console.log(b.prototype)
console.log(b)
*/

/*
function copy(arr) {
  /!*return arr.map((ele) => {

  })*!/

  let b = new Object({})
  for (let i in a) {
    if (a.hasOwnProperty(i)){
      b[i] = a[i]
    }
  }
  b.length = arr.length

 return b
}

let a = [
  {
    q: 'fkeedf',
    l: 9,
    r: 8
  },
  {
    q: 'fkvvvdf',
    l: 9,
    r: 3
  },
  {
    q: 'fkzzzdf',
    l: 9,
    r: 6
  },
]

function copyArr(arr) {
  let another = {}
  for(let prop in arr){
    if(arr.hasOwnProperty(prop)){
      another[prop] = arr[prop]
    }
  }
  another.length = arr.length

  return Array.prototype.slice.call(another)
}

console.log(copyArr(a))*/


/*
function objEqual(a, b) {
  for(let i in a){
    if(!(a.hasOwnProperty(i) && b.hasOwnProperty(i) && a[i] === b[i])){
      return false;
    }
  }

  for(let i in b){
    if(!(a.hasOwnProperty(i) && b.hasOwnProperty(i) && a[i] === b[i])){
      return false;
    }
  }

  return true;
}

let a = {
  name: "ddd",
  age: "21",
  sex: 'male'
}*/

/*

let reg = /:\d\s/g
let str = "dfdfsadf:0 fgdfds:7 "
let b = str.match(reg)

console.log(b)

let a = str.replace(reg, ':0'+b)

console.log(a)*/


/* 时间
let d = new Date()
console.log(d.toISOString())
let dd = d.toISOString().slice(5, 10)
console.log(dd)

let ddd = d.toISOString().slice(11, 16)
console.log(ddd)*/

/*


let a = "dddiiencjddksmfnc,czxc"

if(~a.indexOf('z'))
console.log(1e20)*/

/*
for (let i = 1; i < 50; i++){
  console.log(i, parseInt(1/0, i))
}
*/

/*
parseInt( 0.000008 );		// 0   ("0" from "0.000008")
parseInt( 0.0000008 );		// 8   ("8" from "8e-7")
parseInt( false, 16 );		// 250 ("fa" from "false")
parseInt( parseInt, 16 );	// 15  ("f" from "function..")

parseInt( "0x10" );			// 16
parseInt( "103", 2 );

console.log(parseInt("103", 2  ))

let a = [] + {}
let b = {} + []
console.log(a)

console.log(b)*/



/*
function onlyOne() {
  let args = Array.from(arguments)
  let sum = args.reduce((acc, cur) => {
    if(!!cur){
      acc += 1
      console.log(cur)
    }
    return acc
  }, 0)
  return sum === 1
}

let a = true;
let b = false;
console.log(onlyOne(b,b,b,b,b,b, NaN , 0, '42'))


console.log(false == '42', true == '42')



console.log(0 == "\n")*/
/*
console.log(["1", "2", "3"].map(parseInt))*/

/*

function foo() { }
var oldName = foo.name;
foo.name = "bar";
console.log([oldName, foo.name])

*/
/*

for (var i = 1; i <= 5; i++) {
  (function (i) {
    return setTimeout(function timer() {
      console.log(i);
    }, i * 1000)
  })(i);
}

*/

/*
let a = [2,4,67,4,3,5,6,7,8,9,5,4,6,8]
function sort(arr){
  var i = 0, j = arr.length - 1;
  let temp = 0
  while(i < j){
    while(!!(arr[i] & 1)){
      i++;
    }
    temp = arr[i]

    while (!(arr[j] & 1) && i < j){
      j--
    }
    if(i < j){
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
}

sort(a)
console.log(a)
*/


/*
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000)
}*/

/*

function xor(a, b) {
  let c = a & b
  let d = a | b
  let num1 = 0, num2 = 0;
  for(let i = 0; i < 32; i++){
    if((c >> i) & 1 === 1){
      num1++
    }
    if((d >> i) & 1 ===1){
      num2++
    }
  }
  return num2 - num1
}
console.log(xor(1999, 2299))*/



/*
function randomArr(number) {
  let random, res = [];
  for(let i = 0; i < number; i++){
    random = Math.random() * 50;
    res.push(random);
  }
  return res;
}
let res = {
  a: randomArr(6),
  b: randomArr(8),
  c: randomArr(10),
  d: randomArr(6),
  e: randomArr(7)
};

for (let arr in res) {
  console.log()
  res[arr] = res[arr].map((ele) => ele.toFixed(2));
}

console.log(res)*/


let a = {}
a[2] = 'ddd'
console.log(a)
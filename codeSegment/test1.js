/**
 * Created by see on 8/19/17.
 */

/*
 //统计出现次数最多的字母
 function charaNum(str) {
 let hashTable = {}
 let max = 0
 for(let i = 0, l = str.length; i < l; i++){
 hashTable[str[i]] = !!(hashTable[str[i]]) ? hashTable[str[i]] + 1 : 1;
 }
 for(let i in hashTable){
 console.log(i, hashTable[i])
 }

 return max
 }

 console.log(charaNum("nhchdfjdhsmmmmmmmmmmmmmmmmmmmmmmmmfjdshfjdsfjds"))*/


/*
 var fs = require('fs')
 function savePic(imgData) {

 //过滤data:URL
 var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
 var dataBuffer = new Buffer(base64Data, 'base64');
 fs.writeFile("out.png", dataBuffer, function(err) {
 if(err){
 console.log(err);
 }else{
 console.log("保存成功！");
 }
 });
 }

 let pic;
 fs.readFile("./img","utf-8", function (err, data) {
 if(err){
 console.log(err)
 }
 else {
 pic = data
 savePic(pic)
 }
 })
 */


/*

 function getPicName(type = 'jpg'){
 let now = Date.now();
 let ch = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
 let name = '';
 for(let i = 0; i < 10; i++){
 let random = Math.floor(Math.random() * 51);
 name += ch[random]
 }
 name += now
 name += ('.' + type)
 return name;
 }



 console.log(getPicName())
 */

/*

 let fs = require('fs')
 function getRandomName(type = 'jpg'){
 let charactors = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
 let name = '';
 for(let i = 0; i < 10; i++){
 let random = Math.floor(Math.random() * 51);
 name += charactors[random];
 }
 let now = Date.now();
 name += now;
 name += ('.' + type);
 return name;
 }

 function savePic(imgData, fileName){
 let route = './pic/' + fileName
 let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
 let dataBuffer = new Buffer(base64Data, 'base64');
 fs.writeFile(route, dataBuffer, function(err) {
 if(err){
 console.log(err);
 }else{
 console.log("保存成功！");
 }
 });
 }

 let data = "lovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovae" +
 "lovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovae" +
 "lovaelovaelovavelovaelovaelovaelovavelovaelovaelovaelovavelovae"

 let t1 = Date.now()
 for(let i = 0;i<50; i++){
 savePic(data, getRandomName())
 }
 let t2 = Date.now()
 console.log(t2-t1)

 */

/*function test(success, fail) {
 fs.writeFile('message.txt', 'Hello Nommmmmmde.js', (err) => {
 if (err){
 fail && fail();
 return;
 }
 success && success()
 });
 }

 let success = function () {
 throw new Error('i am success')
 }

 let fail = function () {
 throw new Error('i am fail')
 }

 let fs = require('fs')
 try{
 test(success, fail)
 } catch (e){
 console.log("dhhhhhhdddddddd", e)
 }*/

//const fs = require('fs');

/*let save = new Promise(function (resolve, reject) {
 fs.readFile('message.txt', 'utf-8', function (err, file) {
 if(err){
 reject(err)
 }
 resolve(file)
 })
 })
 save.then((data) => {
 console.log("data: ", data)
 }).catch((e) => {
 console.log("errrr: ", e)
 })*/

/*
 function ss(path) {
 return new Promise(function (resolve, reject) {
 fs.readFile(path, 'utf-8', function (err, file) {
 if(err){
 reject(err)
 }
 resolve(file)
 })
 })
 }

 try{
 ss('message.txt')
 .then(d => console.log(d))
 .catch(e => {
 throw new Error(e)
 })
 } catch (e){
 console.log("eeeeeeeerrrr: ", e)
 }*/

/*console.log(require.extensions['.js'])
 console.log(require)
 console.log(module)
 console.log(exports)
 console.log(__filename, __dirname)*/
/*

 function deleteFile() {
 return new Promise(function (resolve, reject) {
 fs.unlink('./out.png', (err) => {
 if (err) reject(err);
 console.log('before resolve')
 resolve();
 });
 })
 }

 function* d() {
 try{
 yield deleteFile()
 } catch(e){
 console.log("err: ", e)
 }
 }

 let it = d();
 it.next()
 */

/*fs.unlink('./dAxInqxyTW1503736923210.jpg', (err) => {
 if (err) throw err;
 console.log('成功删除 /tmp/hello');
 });*/

/*

 let a = {
 s: 'd',
 e:'f',
 g:'l',
 c: 'ee',
 www: 'lkdjdjh'
 }

 function copyAttrExcpt(source, ...args) {
 let res = {};
 for(let attr in source){
 if(source.hasOwnProperty(attr) && args.every((ele) => ele !== attr)){
 res[attr] = source[attr];
 }
 }
 return res
 }

 let b = copyAttrExcpt(a, 'e', 'g')
 console.log(b)
 */
/*
 function fileExist(filePath) {
 fs.stat(filePath, function (err) {
 if(!err){
 return new Promise(function(resolve, reject) {
 fs.unlink(filePath, (err) => {
 if (err) reject(err);
 resolve();
 });
 })
 }
 })
 }*/

/*
 function deleteFile(filePath) {
 const fs = require('fs');
 if(fs.existsSync(filePath)){
 return new Promise(function(resolve, reject) {
 fs.unlink(filePath, (err) => {
 if (err) reject(err);
 resolve();
 });
 })
 }
 }

 function* t() {
 try{
 yield deleteFile('./imgsss')
 }catch (e){
 console.log(e)
 }
 }

 let it = t()
 it.next()*/


// 一行实现数组去重
/*
 let arr = [2,2,2,3,4,445,0,6,6,7,7,7,7,7]
 console.log([...(new Set(arr))])
 */


//console.log(process.binding('fs'))
/*
 let a = setTimeout(()=> {console.log('aaa')}, 1000)
 console.log('a: ', a)
 console.log(setTimeout(()=>{},9))*/

/*

 let fs = require('fs')

 function del(path) {
 return new Promise(function (resolve, reject) {
 fs.unlink(path, (err) => {
 if (err) reject(err);
 resolve()
 });
 })
 }

 try {
 del('./imgss')
 .then(() => {
 console.log('success')
 })
 .catch((err) => {
 console.log("error: ", err)
 //throw err
 reject(err)
 })
 } catch (e) {
 console.log("outSide err: ", e)
 }*/


/*
function howManyDaysAgo(date) {
    const DAY = 24 * 3600 * 1000;
    const timeGap = 8 * 3600 * 1000;
    let time = date instanceof Date ? (date.getTime() + timeGap) : (new Date(date).getTime() + timeGap);
    let now = Date.now();
    let today = DAY * parseInt(now / DAY);
    return Math.floor(Math.abs(today - time) / DAY);
}*/


/*

let fs = require('fs');

function createFolder(folder) {
    if(fs.existsSync(folder)){
        return;
    }
    fs.mkdirSync(folder);
}

createFolder('./ffffffff')
*/

/*
function sum(a, b) {
    if(a === undefined) return;
    if(b !== undefined){
        return a + b;
    }
    return function (c) {
        return a + c;
    }
}

console.log(sum(3, 2))
console.log(sum(3)(2))*/

/*
function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return "I am " + this.me;
};

function Bar(who) {
    this.me = who
    //Foo.call( this, who );
}
Bar.prototype = Object.create( Foo.prototype );

Bar.prototype.speak = function() {
    console.log( "Hello, " + this.identify() + "." );
};

var b1 = new Bar( "b1" );
var b2 = new Bar( "b2" );

b1.speak();
b2.speak()*/

/*
let a = [3,4,5,6,6, [2,3,4]]
let b = a;
let c = a.slice()

a[5][0] = 999

console.log(a, b, c)*/


//console.log(require.main.filename.slice(__dirname.length + 1))


/*

const crypto = require('crypto');

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'misscat';
var encrypted = aesEncrypt('123456', key);
var decrypted = aesDecrypt('12560aceed65bc9f7ed40577c2690d12', key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
*/

/*
Function.prototype.call1 = function(context) {
 context.fn = this;
 //var args = Array.from(arguments).slice(1);
// console.log(args)




 var args = [];
 for(var i = 1, len = arguments.length; i < len; i++) {
   args.push('arguments[' + i + ']');
 }
 //context.fn(...args);
 eval('context.fn(' + args + ')');
 delete context.fn;
}
var a = 0;
var foo = {
 a: 'lovae',
}

var bar = function () {
 console.log(this.a)
 console.log(arguments)
}

bar.call1(foo, 'dfdf',3,5,7)
*/

/*
//bind函数模拟实现
Function.prototype.bind1 = function (oThis) {
  if (typeof this !== "function") {
    // closest thing possible to the ECMAScript 5 internal IsCallable function
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function () {
    },
    fBound = function () {
    console.log(this instanceof fNOP)
      return fToBind.apply(this instanceof fNOP && oThis
        ? this
        : oThis || window,
        aArgs.concat(Array.prototype.slice.call(arguments)));
    };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

*/

/*

const EventEmitter = require('events');

let emitter = new EventEmitter();

emitter.on('myEvent', function sth () {
  emitter.on('myEvent', sth);
  console.log('hi');
});

emitter.emit('myEvent');

setTimeout(() => emitter.emit('myEvent'), 5000)
*/



const fs = require('fs');

function readFile(path) {
  return new Promise(function (resolve, reject) {

    fs.readFile(path, 'utf-8', function (err, data) {
      if(err){
        reject()
      }
      resolve(data)
    })
  })
}

async function t() {
  try{
    let a = await readFile('test.js');
  }catch (e){
    console.log("errrrr: ", e)
  }
  //console.log(a)
}

t();
/*

function rateF(rate) {
  let res = "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
  console.log(res)
}

rateF(4)
*/


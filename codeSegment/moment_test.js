/**
 * Created by lovae on 2017/9/3.
 */

/*
let momemt = require('moment')


let date = "2017-09-01 10:37:38"

let a = momemt(date).format()
let b = momemt().subtract(10, 'days').calendar().substr(3, 2);

console.log(a)

console.log(typeof b, b)*/


let momemt = require('moment')

let a = momemt("2017-09-04", "YYYYMMDDHHmmss");

console.log(a.fromNow())
let d = Date.now()
console.log(momemt().dayOfYear())
console.log(momemt('2017-09-03T00:04:30.000Z').dayOfYear())
console.log(momemt('2017-09-04T00:40:00.000Z').dayOfYear())


var str = '12 45'
var index = str.indexOf(' ')

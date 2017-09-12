/**
 * Created by lovae on 2017/9/3.
 */


Array.apply(null, Array(100)).map(function(item, i) {
    return 0;
});

new Int8Array(100);

[].fill.call(new Array(100),0);
_.fill(Array(100), 0);

[...Array(100)].map(_=>0);

let a = new Array(101).join(0).split('');       //?? wtf
console.log(a)

for(var a  = [], n = 0; n < 100; a[n++] = 0);


Array.from({length: 100}, _ => 0)

new Array(101).join(0).split('').map((n) => +n);                //这特么才是正解
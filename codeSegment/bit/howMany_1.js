// 给定一个正整数， 求二进制中 ‘1’ 的个数

// method 1 : enum
function get_one(integer) {
  let num = 0;
  for(let i = 0; i < integer; i++){
    num += ((integer>>i) & 1) === 1 ? 1 : 0;
  }
  // 或者简介的写法，效果一样
  //for (num = 0; integer; value >>= 1)
  //  num += integer & 0x01;
  return num;
}
console.log(get_one_1(15))

// 位运算
//每次去掉末位的1，循环m(m为value中1的个数)次后value的值变为0，
// 即要求value中1的个数，令value = value & (value - 1)，
// 循环直到value为0为止，例如5（101），
// 5 & （5 - 1）二进制形式为101 & （101 - 1） = 100，这样每次去掉末位的1。

function get_one_1(integer) {
  let num = 0;
  while (integer){
    integer = integer & (integer - 1);
    num++;
  }
  return num;
}
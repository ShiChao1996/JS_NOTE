let total = 0

function queen(a, cur) {
  if (cur === a.length) {
    console.log(a);
    total++;
    return
  }

  for (let i = 0; i < a.length; i++) {
    a[ cur ] = i;
    flag = true;
    for (let j = 0; j < cur; j++) {
      let ab = i - a[ j ];
      if (a[ j ] === i || (ab > 0 ? ab : -ab) === cur - j) {
        flag = false;
        break
      }
    }

    if (flag) {
      queen(a, cur + 1)
    }
  }

}
queen([ 1, 1, 1, 1, 1, 1, 1, 1 ], 0);
console.log(total)
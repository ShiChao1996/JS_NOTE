function maxSubStr(str1, str2) {
  str1 = ' ' + str1;
  str2 = ' ' + str2;

  let len1 = str1.length;
  let len2 = str2.length;
  let lenArr = [], from = [];

  for (let i = 0; i < len1; i++) {
    lenArr[i] = [];
    from[i] = [];
    for (let j = 0; j < len2; j++) {
      lenArr[i][j] = 0;
      from[i][j] = 0;
    }
  }

  //1: both;    2: str1;   3：str2
  for(let i = 1; i < len1; i++){
    for(let j = 1; j < len2; j++){
      if(str1[i] === str2[j]){
        lenArr[i][j] = lenArr[i - 1][j - 1] + 1;
        from[i][j] = 1;
      }else if(lenArr[i - 1][j] >= lenArr[i][j - 1]){
        lenArr[i][j] = lenArr[i - 1][j];
        from[i][j] = 2;
      }else {
        lenArr[i][j] = lenArr[i][j - 1];
        from[i][j] = 3;
      }
    }
  }

  console.log(lenArr)
  console.log(from)
console.log("maxSubStr('abssdecfdsdesdf', 'abchdsjcbadsjhcdasb')")
  let construct = function (i, j) {
    if(i < 0 || j < 0)return;
    if(from[i][j] === 1){
      construct(i - 1, j - 1)
      console.log(str1[i])
    }else if(from[i][j] === 2){
      construct(i - 1, j)
    }else {
      construct(i, j - 1)
    }
  };

  construct(len1 - 1, len2 - 1)
}

maxSubStr('abssdecfdsdesdf', 'abchdsjcbadsjhcdasb')
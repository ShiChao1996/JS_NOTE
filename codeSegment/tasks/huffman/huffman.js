/*
*  created by Lovae 2017/11/08
* */

let fs = require('fs');
let { decode, encode } = require('./common');
let HufuTree = require('./huff_tree')
let { getFile, resolveStr, StrTool } = require('./tool')

function setCode(content, root) { //转换成0-1串
  let code = {};
  for (let i = 0, len = content.length; i < len; i++) {
    let char = content[ i ];
    if (code[ char ] === undefined) {
      code[ char ] = getCode(char, root, '')
    }
  }
  return code;
}

function getCode(char, root, code) {
  // left 0;right 1
  let res;
  if (char === root.data.char) {
    return code;
  }
  if (root.left) {
    code += '0';
    res = getCode(char, root.left, code);
    if (!res) {
      code = code.slice(0, code.length - 1)
    } else {
      return res;
    }
  }
  if (root.right) {
    code += '1';
    res = getCode(char, root.right, code);
    if (!res) {
      code = code.slice(0, code.length - 1);
    }
    else {
      return res;
    }
  }
}

function zip(content, code) {
  let binStr = '';
  for (let i = 0, len = content.length; i < len; i++) {
    let char = content[ i ];
    binStr += code[ char ];
  }

  let zippedStr = '', hexStr = '';
  for (let i = 0, len = binStr.length; i < len; i += 4) {
    let seg = binStr.slice(i, i + 4);
    hexStr += encode[ seg ]
  }

  zippedStr = hexStr.match(/.{1,2}/g).map(function (v) {
    return String.fromCharCode(parseInt(v, 16));
  }).join('');

  return zippedStr;
}



let propertyArr = []

function zipFile(path, target) {
  getFile(path)
    .then(content => {      // resolve string and compute property
      let obj = resolveStr(content);
      let arr = [];
      for (let attr in obj) {
        arr.push({
          char: attr,
          value: obj[ attr ]
        })
      }

      propertyArr = arr;
      return {
        arr,
        content
      };
    })
    .then(obj => {    //construct tree
      let tr = new HufuTree(obj.arr);
      tr.createHufuTree();
      tr.showTree(tr.root);
      return {
        content: obj.content,
        code: setCode(obj.content, tr.root)
      }
    }).then(obj => {
    return zip(obj.content, obj.code)
  }).then(zippedStr => {
    let infoStr = '';
    propertyArr.map(v => {
      infoStr += v.char + ':' + v.value + ';'
    });
    finalStr = infoStr + '********' + zippedStr;
    fs.writeFile('zipped.txt', finalStr, (err) => {
      if (err) throw err;
      console.log('The file has been saved at zipped.txt!');
    });
  }).catch(e => console.log(e));
}


/*
*
* unzip
* */

function unzipFile(path) {
  getFile(path)
    .then(content => {
      let hexStr = '', binStr = '';
      let dividIdex = content.indexOf('********');
      let infoStr = content.slice(0, dividIdex)
      let zippedStr = content.slice(dividIdex + 8)

      let seg = '';
      for (let i = 0, len = zippedStr.length; i < len; i++) {
        seg = zippedStr.charCodeAt(i).toString(16);
        seg = seg.length === 2 ? seg : '0' + seg;
        hexStr += seg;
      }

      for (let i = 0, len = hexStr.length; i < len; i++) {
        binStr += decode[ hexStr[ i ] ]
      }

      return {
        infoStr,
        binStr
      }
    })
    .then(obj => {
      let arr = [];     // get property arr
      obj.infoStr.split(';').map(line => {
        let data = line.split(':');
        if (data[ 1 ]) {
          arr.push({
            char: data[ 0 ],
            value: data[ 1 ]
          });
        }
        if (data[ 2 ]) {
          arr.push({
            char: data[ 0 ],
            value: data[ 2 ]
          });
        }
      });

      // construct tree
      let tr = new HufuTree(arr);
      tr.createHufuTree();

      let root = tr.root;
      let tempNode = root, unzipStr = '';
      let str = new StrTool(obj.binStr);
      let cur;
      while (str.hasNext()) {
        while (tempNode.left || tempNode.right) {
          cur = str.nextChar();
          if (cur === '0') {
            tempNode = tempNode.left;
          } else {
            tempNode = tempNode.right;
          }
        }
        unzipStr += tempNode.data.char;
        tempNode = root;
      }
      fs.writeFile('unzipped.txt', unzipStr, (err) => {
        if (err) throw err;
        console.log('The file has been saved at unzipped.txt!');
      });
    }).catch(e => console.log(e))
}



//zipFile('test.txt')
unzipFile('zipped.txt');

getFile('zipped.txt').then(d => console.log('zipped',  d.length))
getFile('unzipped.txt').then(d => console.log('unzipped', d.length))
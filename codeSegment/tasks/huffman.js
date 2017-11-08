let fs = require('fs');

function getFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (!err) {
        resolve(data)
      }
      reject();
    })
  })
}

function resolveStr(str) {
  let length = str.length;
  let obj = {};
  for (let i = 0; i < length; i++) {
    let cur = str[ i ];
    obj[ cur ] = obj[ str[ i ] ] === undefined ? 1 : obj[ str[ i ] ] + 1;
  }
  return obj;
}

function HufuTree(arr) {
  this.arr = arr;
  this.root = null;
  this.len = arr.length;
}

function Node(data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

HufuTree.prototype.createHufuTree = function () {
  let nodes = [];
  /*初始化结点*/
  for (let i = 0; i < this.arr.length; i++) {
    nodes.push(new Node(this.arr[ i ]));
  }
  while (nodes.length > 1) {
    nodes.sort(function (a, b) {
      return a.data.value - b.data.value;
    });
    let one = nodes.shift();
    let two = nodes.shift();
    let sum = Number(one.data.value) + Number(two.data.value);
    /*构造结点*/
    let root = new Node({ value: sum });
    root.left = one;
    root.right = two;
    nodes.unshift(root);
  }
  this.root = nodes[ 0 ];
};

HufuTree.prototype.showTree = function (root) {
  let arr = [ root ];
  let cur;
  while (arr.length !== 0) {
    cur = arr.shift();
    console.log(cur.data);
    if (cur.left) {
      arr.push(cur.left)
    }
    if (cur.right) {
      arr.push(cur.right)
    }
  }
};

function setCode(content, root) {
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

const encode = {
  '0000': '0',
  '0001': '1',
  '0010': '2',
  '0011': '3',
  '0100': '4',
  '0101': '5',
  '0110': '6',
  '0111': '7',
  '1000': '8',
  '1001': '9',
  '1010': 'a',
  '1011': 'b',
  '1100': 'c',
  '1101': 'd',
  '1110': 'e',
  '1111': 'f'
}

let decode = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  a: '1010',
  b: '1011',
  c: '1100',
  d: '1101',
  e: '1110',
  f: '1111'
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
      //tr.showTree(tr.root);
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

      let seg = ''
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


function StrTool(str) {
  this.index = 0;
  this.str = str;
  this.len = str.length;
}

StrTool.prototype.nextChar = function () {
  let next = this.str[ this.index ];
  this.index += 1;
  return next;
};
StrTool.prototype.hasNext = function () {
  return this.index < this.len;
};

//zipFile('test')
unzipFile('zipped.txt')


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

exports.getFile = getFile
exports.StrTool = StrTool
exports.resolveStr = resolveStr
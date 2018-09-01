
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

module.exports = HufuTree;
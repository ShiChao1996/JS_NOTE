/*
创建集群

let cp = require('child_process')

let child1 = cp.fork('child.js')
let child2 = cp.fork('child.js')

let server = require('net').createServer()
server.listen(1337, function () {
  child1.send('server', server);
  child2.send('server', server);

  server.close();
})

*/



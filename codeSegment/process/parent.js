
let cp = require('child_process')
/*

let child1 = cp.fork('child.js')
let child2 = cp.fork('child.js')

let server = require('net').createServer()
server.listen(1337, function () {
  child1.send('server', server);
  child2.send('server', server);

  server.close();
})


*/

var child = cp.fork('child.js');

child.on('message', function (m) {
  console.log("parent ", m)
})

child.send({hello: "world"});


/*
const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({ hello: 'world' });*/

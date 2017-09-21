var fork = require('child_process').fork;
var cpus = require('os').cpus();

var server = require('net').createServer();
server.listen(1337);

var workers = {};
var createWorkers = function () {
  var worker = fork(__dirname + '/worker.js');
  worker.on('message', function (m) {
    if(m.act === 'suicide'){
      createWorkers();
    }
  })
  worker.on('exit', function () {
    console.log('worker ' + worker.pid + 'exited.')
    delete workers[worker.pid];
    createWorkers();
  })

  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log('worker ' + worker.pid + 'is working.')
}

for(let i = 0; i < cpus.length; i++){
  createWorkers();
}

process.on('exit', function () {
  for(var pid in workers){
    workers[pid].kill();
  }
})


//需要监控是否重启频繁，引入一个队列
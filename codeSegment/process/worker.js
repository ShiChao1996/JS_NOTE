let http = require('http');
let server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handle by child: ' + process.pid + '\n')
  throw  new Error('error!!!!')
})

var worker;
process.on('message', function (m, tcp) {
  if(m ==='server'){
    worker = tcp;
    tcp.on('connection', function (socket) {
      server.emit('connection', socket)
    })
  }
})


process.on('uncaughtException', function (err) {
  logger.error(err);
  process.send({act: 'suicide'});
  worker.close(function (err) {
    process.exit(1);
  })

  setTimeout(function () {
    process.exit(1)
  }, 5000)
})
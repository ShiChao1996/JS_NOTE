/*
//child
process.on('message', function (m, server) {
  if(m === 'server'){
    server.on('connection', function (socket) {
      socket.end('this is child\n')
    })
  }
})*/

let http = require('http');
let server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handle by child: ' + process.pid + '\n')
})

process.on('message', function (m, tcp) {
  if(m ==='server'){
    tcp.on('connection', function (socket) {
      server.emit('connection', socket)
    })
  }
})
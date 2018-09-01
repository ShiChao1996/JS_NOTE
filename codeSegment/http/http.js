/**
 * Created by see on 8/5/17.
 */

function requestByGet(url, onSucceed, onFailure) {
  //console.log("Get " + url + " started.");

  fetch(url, { // eslint-disable-line no-undef
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
    .then((resp) => {
    console.log(resp)
    return resp.json()})
    .then((json) => {
      //console.log("Get Succeed for " + url + ", response:" + JSON.stringify(json));

      onSucceed(json);
    })
    .catch((err) => {
      //console.error("Get failed for " + url + ", error:" + err);

      onFailure && onFailure(err);
    });
}

requestByGet("http://127.0.0.1:3355/", function (res) {
  console.log(res)
}, function (e){
  console.log("err: ", e)
});


/*
require('http').createServer((req, res) => {
  res.end('hello world');
}).listen(3333);*/


/*
'use strict';

// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(request.method + ': ' + request.url);
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, {'Content-Type': 'text/html'});
  // 将HTTP响应的HTML内容写入response:
  response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
//在命令提示符下运行该程序，可以看到//以下输出：

//$ node hello.js
//Server is running at http://127.0.0.1:8080/
*/

/*
'use strict';

var
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
  // 获得URL的path，类似 '/css/bootstrap.css':
  var pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  var filepath = path.join(root, pathname);
  // 获取文件状态:
  /!*fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });*!/
  fs.readFile(filepath, function (err, data) {
    if(err){
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
    else {
      response.end(data)
    }
  })
});

server.listen(8080);*/


/*
// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function(request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(request.method + ': ' + request.url);
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, { 'Content-Type': 'text/html' });
  // 将HTTP响应的HTML内容写入response:
  response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
*/

/*

var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        console.log('data: ', data);
    });
    socket.on('end', function () {
        console.log('break');
    });
    socket.write('welcome!!!!!!!!');

})


server.listen(8000, function () {
    console.log('server is now on 8000')
})*/
/*

var server1 = net.createServer();
server1.on('connection', function (socket) {
    socket.on('data', function (data) {
        console.log('data: ', data);
    });
    socket.on('end', function () {
        console.log('break');
    });
    socket.write('welcome!!!!!!!!');

})

server1.listen('/tmp/echo.sock');
*/

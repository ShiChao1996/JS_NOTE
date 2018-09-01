/*
/!**
 * Created by see on 8/21/17.
 *!/

var request = require('request');


var options = {
  url: 'https://api.github.com/repos/mikeal/request',
  headers: {
    'User-Agent': 'request'
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}

request(options, callback);



// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function(req, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(req.method + ': ' + req.url);
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, { 'Content-Type': 'text/html' });
  // 将HTTP响应的HTML内容写入response:
  request({url: 'http://www.baidu.com'}, function (err, res, data) {
    if(err)console.log(err)
    response.end(res);

    //console.log(data)
  })
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');


*/


let request = require('request');



var options = {
    url: 'http://www.gaopinimages.com/search#q=%E5%A4%8F%E5%A4%A9%20%E6%BB%8B%E5%91%B3&p=1',
    headers: {
        'User-Agent': 'request'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        console.log(body)
    }
}

request(options, callback);

/**
 * Created by lovae on 2017/9/11.
 */

/*
var net = require('net');

var client = connect({port:8000}, function () {
    console.log('client conn')
    client.write('world!!!!!')
})*/


//Example of connecting to google.com:
var http = require('http');

var google = http.createClient(80, 'www.baidu.com');
var request = google.request('GET', '/',
    {'host': 'www.google.com'});
request.end();
request.on('response', function (response) {
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
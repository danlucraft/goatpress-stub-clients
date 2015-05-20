#!/usr/bin/env node

var net = require('net');

var addr = '127.0.0.1'
var port = 4123
 
var client = new net.Socket();
client.connect(port, addr, function() {
	console.log('Connected to ', addr, ':', port);
});
 
client.on('data', function(data) {
  var res = data.toString().split('\n');
  for (var i=0; i < res.length -1; i++) {
      handleLine(res[i]);
    
  }
});

function handleLine(data) {
	console.log('> "' + data + '"');

    if (data === '; name ?') {
        console.log("> jsclient");
        client.write('jsclient\n');
    } else if (data === '; ping ?') {
        console.log("> pong");
        client.write('pong\n');
    }
}
 
client.on('close', function() {
	console.log('Connection closed');
});

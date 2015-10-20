var http = require('http');
var fs = require('fs');
var static_module = require('./static.js');

server = http.createServer(function(request, response){
	static_module(request, response);
});

server.listen(6150);
console.log('Running in localhost at port 6150');
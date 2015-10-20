var http = require('http');
var fs = require('fs');
module.exports = function(request, response){
	console.log('Request', request.url);
	var request_str = request.url;
	var views = request_str.indexOf('views');
	var style = request_str.indexOf('stylesheets');
	var images = request_str.indexOf('images');
	if (request_str === '/'){
		fs.readFile('./views/index.html', 'utf-8', function (errors, contents){
			response.writeHead(200, {'Content-Type' : 'text/html'});
			response.write(contents);
			response.end()
		});
	} else if (views > 0 || style > 0){
		var file_type = request_str.substr(request_str.indexOf('.') + 1);
		if (file_type == 'html' || file_type == 'css'){
			fs.readFile('.' + request_str, 'utf-8', function (errors, contents){
				if (contents){
					response.writeHead(200, {'Content-Type' : 'text/' + file_type});
					response.write(contents);
					response.end()
				} else {
					response.writeHead(404);
					response.end('Requested page not found');
				}
			});
		} 
	} else if (images > 0){
		var file_type = request_str.substr(request_str.indexOf('.') + 1);
		fs.readFile('.' + request_str, function (errors, contents){
				if (contents){
					response.writeHead(200, {'Content-Type' : 'image/' + file_type});
					response.write(contents);
					response.end();
				} else {
					response.writeHead(404);
					response.end('Requested page not found');
				}
			});
	} else {
		response.writeHead(404);
		response.end('Requested page not found');
	}
}
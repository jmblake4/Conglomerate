/* Require node modules to implement */
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

function requestHandler(req, res){
    var route = url.parse(req.url).path;
	var reqURL = url.parse(req.url).pathname;
	var filePath, header, statusCode;

	if (reqURL === '/') {
		route = '/index.html';
		header = { 'Content-Type': 'text/html' };
	} else if (req.url.slice(-2) === 'js') {
		header = { 'Content-Type': 'application/javascript' };
	} else if (req.url.slice(-3) === 'css') {
		header = { 'Content-Type': 'text/css' };
	} else if (req.url.slice(-4) === 'html') {
		header = { 'Content-Type': 'text/html' };
	} else if (req.url.slice(-3) === 'svg') { 
		header = { 'Content-Type': 'image/svg+xml'};
	} else if (req.url.slice(-3) === 'png') { 
		header = { 'Content-Type': 'image/png'};
	} else if (req.url.slice(-3) === 'jpg' || req.url.slice(-4) === 'jpeg') { 
		header = { 'Content-Type': 'image/jpeg'};
	} else {
		res.writeHead(404);
		res.end();
	}
	
	filePath = path.join(__dirname, '../client' + route);
	// console.log(filePath);
	fs.readFile(filePath, function(err, data) {
		if ( err != null ) {
			console.log(err);
			res.writeHead(404);
			res.end();
		}
		statusCode = 200;
		res.writeHead(statusCode, header);
		res.end(data);
	});
};

var server = http.createServer(requestHandler);

var port = 3000;

server.listen(port);
console.log('Listening on port', port);


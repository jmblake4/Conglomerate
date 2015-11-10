// curl -k https://localhost:8000/
var https = require('https');
var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var options = {
  key: fs.readFileSync('./conglomerate-key.pem'),
  cert: fs.readFileSync('./conglomerate-cert.pem')
};

var server = https.createServer(options, requestHandler);
var port = 3000;
server.listen(port);
console.log('Listening on port', port);

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
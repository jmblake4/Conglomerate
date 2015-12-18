var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
// var request = require('request');
var request_p = require('request-promise');
var bodyParser = require('body-parser');
var accountOptions;
var app = express();

https.createServer({
	key: fs.readFileSync('server/server.key'),
	cert: fs.readFileSync('server/server.crt')
}, app).listen(3000);

app.use(bodyParser.json());

app.use('/', express.static('client'));

app.get('/weather/:latitude/:longitude', function(req, res) {
	var weatherOptions = {
		uri: 'http://api.openweathermap.org/data/2.5/weather?lat=' + req.params.latitude + '&lon=' + req.params.longitude + '&appid=26c35d41ead43cdf58f2b5b32d00cd45',
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	}
	request_p(weatherOptions).then(function(data) {
		res.send(data);
	}).catch(function(error) {
		console.log('Error: ' + error);
		res.send(error);
	});
});

app.get('/guardian', function(req, res) {
	var guardianOptions = {
		uri: 'https://content.guardianapis.com/search?api-key=9uhgzw5cgu3mq82e2ymu5jxz',
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	}
	request_p(guardianOptions).then(function(data) {
		res.send(data);
	}).catch(function(error) {
		console.log('Error: ' + error);
		res.send(error);
	});
});
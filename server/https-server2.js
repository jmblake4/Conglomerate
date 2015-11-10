var https = require('https');
var fs = require('fs');

var opts = {key: fs.readFileSync('./conglomerate-key.pem'),
  cert: fs.readFileSync('./conglomerate-cert.pem')};

https.createServer(opts, function (req, res) {
  res.end('secured!');
}).listen(4443); //443 for prod
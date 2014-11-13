var http = require('http');
var server = http.createServer(function(req, res) {
    var body = "Uber Node.js course\n";
    res.statusCode = 200;
    res.setHeader('Content-length', body.length);
    res.setHeader('Content-type', 'text/html');
    res.end(body);
});
server.listen(9000, function() {
    console.log("listening on 9000");
});
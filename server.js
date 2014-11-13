var http = require('http');
var server = http.createServer(function(req, res) {
    res.end("Hello");
});
server.listen(9000, function() {
    console.log("listening on 9000");
});
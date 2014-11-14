var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
    function isValidIndex(index) {
        if (isNaN(i)) {
            res.statusCode = 400;
            res.end('Item id not valid');
            return false;
        }
        else if (!items[i]) {
            res.statusCode = 404;
            res.end('Item not found');
            return false;
        }
        return true;
    }

    switch (req.method) {
    case 'POST':
        var item = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            item += chunk;
        });
        req.on('end', function () {
            items.push(item);
            res.end('Item added\n' + items);
        });
        break;
    case 'GET':
        items.forEach(function (item, i) {
            res.write(i + '. ' + item + '\n');
        });
        res.end();
        break;
    case 'DELETE':
    case 'PUT':
        var pathname = url.parse(req.url).pathname;
        var i = parseInt(pathname.slice(1), 10);
        if (isValidIndex(i)) {
            if (req.method == 'DELETE') {
                items.splice(i, 1);
                res.end('Item deleted successfully');
            } else {
                //PUT
                var newValue = url.parse(req.url).query;
                if (newValue != null) {
                    items[i] = newValue;
                    res.end("Item " + i + " updated to " + newValue);    
                } else {
                    res.end("Failed to update Item " + i);
                }
                
            }
        }
        break;
    }
});

server.listen(9000, function(){
   console.log('listening on 9000');
});
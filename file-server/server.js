var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var qs = require('querystring');

var root = __dirname;
var items = [];

var server = http.createServer(function (req, res) {
    var htmlHeader = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Shopping List</title></head><body>';
    var htmlForm = '<form action="/" method="post"><input type="text" name="item" placeholder="Enter an item"><button>Add Item</button></form>';
    var htmlLineBreak = '<BR>';
    var htmlFooter = '</body></html>';

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
    if(req.url == '/') {
        switch (req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.write(htmlHeader);
                items.forEach(function (item, i) {
                    res.write(i + '. ' + item + htmlLineBreak);
                });
                res.end(htmlFooter);
            });

            break;
        case 'GET':
            res.write(htmlHeader);
            res.write(htmlForm);
            items.forEach(function (item, i) {
                res.write(i + '. ' + item + htmlLineBreak);
            });
            res.end(htmlFooter);
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
    }



////////////////////////////////////
/*    var url = parse(req.url);
    var path = join(root, url.pathname);
    var stream = fs.createReadStream(path);
    
    fs.stat(path, function (err, stat) {
        if (err) {
            if (err.code == 'ENOENT') {
                res.statusCode = 404;
                res.end('File Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            var stream = fs.createReadStream(path);
            res.setHeader('Content-Length', stat.size);
            stream.pipe(res);
            stream.on('error', function (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });*/
});

server.listen(9000, function() {
    console.log("listening on 9000");
});

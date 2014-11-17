var express = require('express'),
    port = 9000;
var hb = require('express-handlebars');

var app = express();

app.engine('hbs', hb({extname: 'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.listen(port, function(){
  console.log('listening on port ' + port);
});

app.get('/:name', function(req, res){
  res.render('greeting', {title: 'SA Greeting App', name: req.params.name});
});

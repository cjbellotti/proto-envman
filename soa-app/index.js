var express = require('express');
var app = express();

var port = process.env.PORT ;

app.use(function (req, res, next) {
  console.log ('%s - %s', req.method, req.url);
  next();
});

app.use(express.static('./public'));

app.listen(port, function() {
  console.log('Server listening on port %d', port);
});

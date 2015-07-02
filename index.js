var app = require('express')();

var port = process.env.PORT || 3000;
app.use(function (req, res, next) {
  console.log ('%s - %s', req.method, req.url);
  next();
});

app.use(require('./app/services'));

app.listen(port, function() {
  console.log('Server listening on port %d', port);
});

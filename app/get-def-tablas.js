var app = require('express')();
var config = require('./config');
var defTablas = require('./tables');

app.get('/def-tablas', function (req, res) {
  res.json(defTablas)
      .end();
});

module.exports = app;

var app = require('express')();
var soa = require('./soa'); 

app.get('/soa-comparer', function (req, res) {
   res.json(soa).end();
});

module.exports = app;

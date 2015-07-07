var app = require('express')();
var config = require('./config');

app.get('/ambientes', function (req, res) {
  var listaAmbiente = Object.keys(config.ambientes);
  res.json(listaAmbiente)
      .end();
});

module.exports = app;

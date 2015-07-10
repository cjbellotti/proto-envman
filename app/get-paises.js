var mandb = require('./lib/mandb');
var app = require('express')();
var config = require('./config');

var query = 'select unique(pais) from DTVLA.DVM_SISTEMA order by PAIS';

app.get('/paises/:ambiente', function (req, res) {

  var dc = config.ambientes[req.params.ambiente][0].name;

  mandb(req.params.ambiente, dc, query, function (err, response) {

    res.json(response)
      .end();

  });

});

module.exports = app;

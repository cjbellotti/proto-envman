var defTablas = require('./tables');
var config = require('./config');
var mandb = require('./lib/mandb');
var app = require('express')();

var dc = {};
var tablas = {};

for (var ambiente in config.ambientes) {

  console.log('Publicando servicios de ambiente %s...', ambiente);
  for (var tabla in defTablas) {

    // Se guarda el datasource con el alias de la tabla
    dc[defTablas[tabla].alias] = {};
    dc[defTablas[tabla].alias][ambiente] = config.ambientes[ambiente][0].name;

    tablas[defTablas[tabla].alias] = tabla;

    var url = '/' + defTablas[tabla].alias + '/:ambiente/:id?';
    console.log('\tPublicando GET %s...', url);
    app.get(url, function (req, res) {
      
      var nombreTabla = req.url.substring(1, req.url.substring(1).indexOf('/') + 1);
      var query = 'SELECT * FROM ' + tablas[nombreTabla] + ' ORDER BY ID';

      mandb(req.params.ambiente, dc[nombreTabla][req.params.ambiente], query, function (err, response) {

        if (err)
          response = err;

        res.json(response);
      });

    });

  }

}

module.exports = app;


var defTablas = require('./tables');
var config = require('./config');
var mandb = require('./lib/mandb');
var app = require('express')();
var _ = require('underscore');
var Tipos = require('./tipos');

var dc = {};
var tablas = {};
var esquemas = {};
var orderBy = {};
var claves = {};

for (var ambiente in config.ambientes) {

  console.log('Publicando servicios de ambiente %s...', ambiente);
  for (var tabla in defTablas) {

    // Se guarda el datasource con el alias de la tabla
    if (!dc[defTablas[tabla].alias])
      dc[defTablas[tabla].alias] = {};
    dc[defTablas[tabla].alias][ambiente] = config.ambientes[ambiente][0].name;

    tablas[defTablas[tabla].alias] = tabla;

    esquemas[defTablas[tabla].alias] =  defTablas[tabla].esquema;
    orderBy[defTablas[tabla].alias] = defTablas[tabla].orderBy;
    claves[defTablas[tabla].alias] = defTablas[tabla].claves;

    //var url = '/' + defTablas[tabla].alias + '/:ambiente/:id?';
    var url = '/' + defTablas[tabla].alias + '/:ambiente';
    for (var campo in defTablas[tabla].claves)
      url += '/:' + campo + '?';

    console.log('\tPublicando GET %s...', url);
    app.get(url, function (req, res) {
      
      var nombreTabla = req.url.substring(1, req.url.substring(1).indexOf('/') + 1);
      // var query = 'SELECT * FROM DTVLA.' + tablas[nombreTabla] + ' ORDER BY ID';
      var query = 'SELECT * FROM ' + esquemas[nombreTabla] + 
                    '.' + tablas[nombreTabla];

      var byID = true;
      for (var campo in claves[nombreTabla]){
        if (!req.params[campo])
          byID = false; 
      }

      if (byID) {

        var cantCampos = _.keys(claves[nombreTabla]).length;
        var index = 0;
        query += ' WHERE ';
        for (var campo in claves[nombreTabla]) {
  
          var comillas = (claves[nombreTabla][campo] == Tipos.Cadena) ? "'" : "";
          query += campo + ' = ' + comillas + req.params[campo] + comillas;
          if (index < cantCampos - 1)
            query += ' AND ';

          index++;

        }

      }
      
      query += ' ORDER BY ' + orderBy[nombreTabla];

      mandb(req.params.ambiente, dc[nombreTabla][req.params.ambiente], query, function (err, response) {

        if (err)
          response = err;

        if (byID)
          response = response[0] || {};
        res.json(response);
      });

    });

  }

}

module.exports = app;


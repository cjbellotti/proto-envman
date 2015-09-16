var defTablas = require('./tables');
var config = require('./config');
var mandb = require('./lib/mandb');
var async = require('async');
var _ = require('underscore');
var app = require('express')();

var dc = {};
var tablas = {};

for (var ambiente in config.ambientes) {

  console.log('Publicando servicios de ambiente %s...', ambiente);
  for (var tabla in defTablas) {

    // Se guarda el datasource con el alias de la tabla
    if (!dc[defTablas[tabla].alias])
      dc[defTablas[tabla].alias] = {};
    dc[defTablas[tabla].alias][ambiente] = config.ambientes[ambiente][0].name;

    tablas[defTablas[tabla].alias] = tabla;

    var url = '/' + defTablas[tabla].alias + '/:ambiente/:id?';
    console.log('\tPublicando GET %s...', url);
    app.get(url, function (req, res) {
      
      var nombreTabla = req.url.substring(1, req.url.substring(1).indexOf('/') + 1);
      var query = 'SELECT * FROM DTVLA.' + tablas[nombreTabla] + ' ORDER BY ID';

      mandb(req.params.ambiente, dc[nombreTabla][req.params.ambiente], query, function (err, response) {

        if (err)
          response = err;

        res.json(response);
      });

    });

  }

}

function compararArrays (claves, comparar, datos1, datos2, callback) {

  var faltantes = [];
  var retDatos1 = [];
  var retDatos2 = [];

  var iterator = 0;
  async.eachSeries(datos1, function (item, datos1Next) {

    console.log('--------- Iterator : %d -----------', iterator);
    console.log (item);

    var keyFields = _.clone(claves);
    async.eachSeries(_.keys(keyFields), function (field, fieldNext) {
    
      keyFields[field] = item[field];
      console.log ('claves : %s - item : %s', keyFields[field], item[field]);
      fieldNext();

    }, function () {

      console.log('Claves:');
      console.log(keyFields);
      var index2 = _.findIndex(datos2, keyFields);

      if (index2 >= 0) {

        var igual = true;

        async.eachSeries(_.keys(comparar), function (field, compararNext) {

          if (igual) {

              igual = (item[field] == datos2[index2][field]);

          }

          compararNext();

        }, function () {

          if (!igual) 
            item.diff = true;

        });

      } else {
        
        faltantes.push(item);

      }

    }); 
   
    iterator++;
    datos1Next();

  }, function () {

    if (callback)
      callback(faltantes);

  });

}

function compararTablas(tabla, datos1, datos2, callback) {

  var claves = {};
  var comparar = {};

  var faltantes1 = [];
  var faltantes2 = [];

  async.eachSeries(_.keys(defTablas[tabla].campos), function (field, fieldNext) { 

    if (defTablas[tabla].campos[field].tipo == 'K')
      claves[field] = "";
    else
      comparar[field] = "";
    
    fieldNext();

  }, function () {

    compararArrays(claves, comparar, datos1, datos2, function (resultado) {

      faltantes2 = resultado;
      compararArrays(claves, comparar, datos2, datos1, function (resultado) {

        faltantes1 = resultado;
        
        async.eachSeries(faltantes1, function (item, faltantes1Next) {

          var datos = _.clone(item);
          datos.new = true;

          datos1.push(datos);

          faltantes1Next();

        }, function () {

          async.eachSeries(faltantes2, function (item, faltantes2Next) {

            var datos = _.clone(faltantes2[index]);
            datos.new = true;

            datos2.push(datos);

          }, function () {

            if (callback)
              callback(datos1, datos2);

          });

        });

      });

    });

  });

}

console.log('Publicando GET /comparar/:tabla/:ambiente1/:ambiente2...'); 
app.get('/comparar/:tabla/:ambiente1/:ambiente2', function (req, res) {

  var response = {
    err : null,
    ambiente1 : [],
    ambiente2 : []
  };

  if (!dc[req.params.tabla]) {
    response.err = 'Tabla inexistente';
    res.json(response)
        .end();
  } else if (!dc[req.params.tabla][req.params.ambiente1]) {
    response.err = 'Tabla ' + req.params.tabla + ' inexistente en ambiente ' + req.params.ambiente1 + '.';
    res.json(response)
        .end();
  } else if (!dc[req.params.tabla][req.params.ambiente2]) {
    response.err = 'Tabla ' + req.params.tabla + ' inexistente en ambiente ' + req.params.ambiente1 + '.';
    res.json(response)
        .end();
  } else {

    var query = 'SELECT * FROM DTVLA.' + tablas[req.params.tabla] + ' ORDER BY ID';

    mandb(req.params.ambiente1, dc[req.params.tabla][req.params.ambiente1], query, function (err, data) {

      if (err)
        response.err = err;
      else {

        var ambiente1 = data;
        mandb(req.params.ambiente2, dc[req.params.tabla][req.params.ambiente2], query, function (err, data) {
      
          if (err)
            response.err = err;
          else {

            var ambiente2 = data;
            compararTablas(tablas[req.params.tabla], ambiente1, ambiente2, function (datos1, datos2) {

              response.ambiente1 = datos1;
              response.ambiente2 = datos2;
              res.json(response)
                .end();

            });
          }

        });

      }
      
    });

  }

});

module.exports = app;


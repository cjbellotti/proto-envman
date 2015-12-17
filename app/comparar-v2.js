var defTablas = require('./tables-definition');
var config = require('./config');
var sqlite3 = require('sqlite3').verbose();
var mandb = require('./lib/mandb');
var generarQuery = require('./lib/gen-query-faltantes');
var async = require('async');
var _ = require('underscore');
var express = require('express');
var methodOverride = require('method-override');

var app = express();
app.use(methodOverride());

// Obtiene los datos de la tabla para el ambiente indicado
function obtenerDatos (ambiente, tabla, callback) {

  var esquema = defTablas[tabla].esquema;
  var query = 'SELECT * FROM ' + esquema + '.' + tabla + ' ORDER BY ' + _.keys(defTablas[tabla].claves).join(',');
  console.log('>>>>> AMBIENTE >>>>>> %s', ambiente);
  mandb(ambiente, config.ambientes[ambiente][0].name, query, function (err, response) {

    callback(err, response);

  });

}

// Carga el ambiente indicado
function cargarAmbiente(ambiente, callback) {

  var data = {};

  async.each(_.keys(defTablas), function (tabla, next) {

    obtenerDatos (ambiente, tabla, function (err, datos) {

      if (err)
        data[tabla] = err;
      else
        data[tabla] = datos;

      next();

    });

  }, function () {

    callback (data);

  });

}

// Carga los datos en SQLite
function cargarTablaEnDB(db, ambiente, tabla, datos, callback) {

  if (datos.length > 0) {

    var queryCreate = 'CREATE TABLE ' + tabla + '_' + ambiente + ' (';
    var fields = [];
    var fieldsDef = [];
    var values = [];
    async.each(_.keys(datos[0]), function (field, next) {

        fieldsDef.push(field + ' ' + ((defTablas[tabla].campos[field]) ? (defTablas[tabla].campos[field].tipo == 'X') ? 'TEXT' : 'NUMBER' : 'NUMBER'));
        fields.push(field);
        values.push('?');
        next();

    }, function () {

      queryCreate += fieldsDef.join(',') + ')';

      console.log(queryCreate);
      db.run (queryCreate, function (err) {

        if (err)
          callback(err);
        else {

          var queryInsert = 'INSERT INTO ' + tabla + '_' + ambiente + ' (';
          queryInsert += fields.join(',') + ') VALUES (' + values.join(',') + ')';
          console.log(queryInsert);
          var stmt = db.prepare(queryInsert);
          async.each(datos, function (registro, next) {

            var data = [];
            for (var index in fields) {
              data.push(registro[fields[index]]);
            }
            stmt.run(data, function (err) {
              next();
            });

          }, function () {

            stmt.finalize();
            callback();

          });

        }

      });

    });

  }

}

app.get('/comparar/:ambiente1/:ambiente2', function (req, res) {

  var db = new sqlite3.Database(':memory:');
  var ambientes = [req.params.ambiente1, req.params.ambiente2];
  async.each(ambientes, function (ambiente, next) {
    
    cargarAmbiente(ambiente, function (datos) {

      async.each (_.keys(datos), function (tabla, nextTabla) {

        cargarTablaEnDB(db, ambiente, tabla, datos[tabla], function () {
          nextTabla();
        });

      }, function () {

        next();

      });

    });

  }, function () {

    var response = {};
    response[req.params.ambiente1] = {};
    response[req.params.ambiente2] = {};

    async.each(_.keys(defTablas), function (tabla, next) {

      db.all(generarQuery(tabla, req.params.ambiente2, req.params.ambiente1), function (err, rows) {
        
        response[req.params.ambiente1][tabla] = {};
        response[req.params.ambiente1][tabla].faltantes = rows;

        db.all(generarQuery(tabla, req.params.ambiente1, req.params.ambiente2), function (err, rows) {
          
          response[req.params.ambiente2][tabla] = {};
          response[req.params.ambiente2][tabla].faltantes = rows;

          next();

        });

      });

    }, function () {

      db.close();
      res.json(response)
        .end();

    });

  });

});

module.exports = app;

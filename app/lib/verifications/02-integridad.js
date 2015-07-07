var defTablas = require('../../tables');
var Tipos = require('../../tipos');
var async = require('async');
var _ = require('underscore');

function actualizarIntegridad (registros, ref, id, idn, callback) {

  async.each(Object.keys(registros), function (tabla, next) {

      async.each(registros[tabla], function (registro, callbackNext) {

          for (var field in defTablas[tabla].campos) {

            if (defTablas[tabla].campos[field].ref)
              if (defTablas[tabla].campos[field].ref == ref &&
                  registro[field] == id)
                registro[field] = idn;
            
          }
          callbackNext();

      }, function(err) {

          next();

      });

  }, function (err){

      callback(registros);

  });

}

function integridad (registros, callback) {

  var response = {};

  async.each(Object.keys(registros), function (tabla, next) {

    response[tabla] = [];
    async.each(registros[tabla], function (registro, callbackNext) {

      if (registro.IDN){

        actualizarIntegridad(registros, tabla, registro.ID, registro.IDN, function () {
          callbackNext();
        });
        
      } else
        callbackNext();

    }, function (err) {
      next();
    });

  }, function (err){

    callback(response);

  });

}

module.exports = integridad;

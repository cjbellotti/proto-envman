var defTablas = require('../../tables');
var Tipos = require('../../tipos');
var async = require('async');
var _ = require('underscore');

/* Momentaneo por diferencias entre los nombres de las tablas utilizados en el frontend*/
var nombresTablas = {
  sistema : "DVM_SISTEMA",
  entidadcanonica : "DVM_ENTIDAD_CANONICA",
  valorcanonico : "DVM_VALOR_CANONICO",
  valorsistema : "DVM_VALOR_SISTEMA"
};

function actualizarIntegridad (registros, ref, id, idn, callback) {

  async.each(Object.keys(registros), function (tabla, next) {

      async.each(registros[tabla], function (registro, callbackNext) {

          var nombreTabla = nombresTablas[tabla];

          for (var field in defTablas[nombreTabla].campos) {

            if (defTablas[nombreTabla].campos[field].ref)
              if (defTablas[nombreTabla].campos[field].ref == ref &&
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

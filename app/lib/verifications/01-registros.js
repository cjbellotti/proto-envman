var defTablas = require('../../tables');
var Tipos = require('../../tipos');
var async = require('async');
var _ = require('underscore');

var dbData = {};

function verificar(tabla, registro) {

    var reg = null;
    var query = {};

    for (var field in defTablas[tabla]) {

      if (registro[field] && defTablas[tabla][field].tipo == Tipos.Clave)
        query[field] = registro[field];

    }

    var index = _.findIndex(dbData[tabla], query);

    if (index < 0) {

      // - Obtiene ultimo ID libre
      // - Asigna ID nuevo en IDN
      registro.IDN = dbData[tabla][ dbData[tabla].length - 1 ].ID + 1;
      // - 
    } else {

      // - Verifica si algun campo cambío
      registro.MOD = false;
      for (var field in defTablas[tabla]) {

        if (registro[field] != dbData[tabla][index][field]) {
            registro.MOD = true;
            registro.origenReg = dbData[tabla][index][field];
        }

      }

    }

    if (registro.MOD && registro.ID != dbData[tabla][index][field].ID) {
      registro.IDN = dbData[tabla][index][field].ID;
    }

    if (registro.IDN)
      reg = registro;

    return reg;

}

module.exports = function (manDB, ambiente, dc, tablas, callback){

  var result = {};
  var listaTablas = _.keys(defTablas);
  dbData = {};

  async.each(listaTablas, function (tabla, callback) {

     var query = 'select * from DTVLA.' + tabla;
     manDB(ambiente, dc, query, function (err, result) {
       dbData[tabla] = result;
       dbData[tabla].sort(function (a, b) {
          return (a.ID - b.ID);
       });
       callback(err);
     });

  }, function (err) {

      async.each(Object.keys(tablas), function (tabla, next) {

        async.each(tablas[tabla], function (registro, callback) {

          var reg = verificar(tabla, registro);
          if (reg) {

            if (!result[tabla])
              result[tabla] = [];

            result[tabla].push(reg);

          }

          callback();

        }, function (err) {

          next(); 

        });

      }, function (err) {

        callback(err, result);

      });

  });

}

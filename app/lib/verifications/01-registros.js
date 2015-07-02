var defTablas = require('../../tables');
var async = require('async');
var _ = require('underscore');

var dbData = {};

function verificar(tabla, registro) {

    var query = {};

    for (var field in defTablas[tabla]) {

      if (registro[field])
        query[field] = registro[field];

    }

    var index = _.findIndex(dbData, query);

    if (index < 0) {

      // - Obtiene ultimo ID libre
      // - Asigna ID nuevo en IDN
      // - 
    } else {

      // - Verifica si algun campo cambío
      registro.MOD = false;
      for (var field in registro) {

        if (registro[field] != dbData[tabla][index][field]) {
            registro.MOD = true;
            registro.origenReg = dbData[tabla][index][field];
        }

      }

    }

    if (registro.MOD && registro.ID != dbData[tabla][index][field].ID) {
      registro.IDN = dbData[tabla][index][field].ID;
    }

}

module.exports = function (manDB, ambiente, dc, tablas, callback){

  dbData = {};
  var listaTablas = _.keys(defTablas);

  async.each(listaTablas, function (tabla, callback) {

     manDB(ambiente, dc, 'DTVLA.' + tabla, undefined, function (err, result) {
       dbData[tabla] = result;
       callback(err);
     });

  }, function (err) {

      for (var tabla in tablas) {

        for (var index in tablas[tabla]){

          verificar(tabla, tablas[tabla][index]);

        }

      }

      callback(err, tablas); 

  });

}

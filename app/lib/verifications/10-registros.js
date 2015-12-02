var defTablas = require('../../tables');
var Tipos = require('../../tipos');
var async = require('async');
var _ = require('underscore');

module.exports = function (manDB, ambiente, dc, tablas, callback, all) {

  var result = {};
  var dbData = {};
  
  async.each(_.keys(defTablas), function (tabla, callback) {

    var query = 'select * from ' + defTablas[tabla].esquema + '.' + tabla;
    manDB(ambiente, dc, query, function (err, result) {

      dbData[tabla] = result;
      callback();

    });

  }, function (err) {

    async.each(_.keys(tablas), function (tabla, next) {

      async.each(tablas[tabla], function (registro, callback) {

          var query = {};
          for (var field in registro)
            if (defTablas[tabla].campos[field])
              if (defTablas[tabla].campos[field].tipo == Tipos.Clave)
              query[field] = registro[field];

          var index = _.findIndex(dbData[tabla], query);
          if (index >= 0) {

              registro.MOD = false;
              for (var field in defTablas[tabla].campos)
                if (registro[field] != dbData[tabla][index][field]) {
                  registro.MOD = true;
                  registro.origenReg = dbData[tabla][index];
                }

          } else {

            registro.IDN = 1

          }

          registro.impacto = (!_.isUndefined(registro.IDN) || registro.MOD);

          if (!result[tabla])
            result[tabla] = [];

          result[tabla].push(registro);

          callback();

      }, function (err) {
      
        next();

      });

    }, function (err) {

      callback(err, result);

    });

  });

}

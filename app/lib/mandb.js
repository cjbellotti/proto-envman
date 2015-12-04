var oracledb = require('oracledb');
var config = require('../config');
var async = require('async');
var _ = require('underscore');

var pool = {};
console.log('Inicializando Pool de conexiones...');
async.eachSeries(_.keys(config.ambientes), function (ambiente, next) {

  console.log('\tCreando pool de connexiones para ambiente %s...', ambiente); 
  pool[ambiente] = {};
  async.eachSeries(config.ambientes[ambiente], function (dataCenter, nextDC) {

    var env = ambiente;
    var dc = dataCenter.name;
    console.log('\t\tCreando pool de conexiones para data center %s...', dc);
    var username = dataCenter.username;
    var password = dataCenter.password;
    var connectString = dataCenter.host; 
    oracledb.createPool( 
      {
        user : username,
        password : password,
        connectString : connectString,
        outFormat : oracledb.OBJECT,
        stmtCacheSize : 100,
        poolMin : 20,
        poolMax : 100
      },
      function (err, p) {

        console.log ('Ambiente: %s', ambiente);
        if (err) {
          console.log('Error al inicializar el pool %s', ambiente);
          console.log(err);
        } else
          pool[ambiente][dc] = p;

        nextDC();

    });

  }, function () {

    next();

  });

});

module.exports = function (ambiente, dc, query, callback){

  if (pool[ambiente]) {

    if (pool[ambiente][dc]) {

      pool[ambiente][dc].getConnection(function(err, connection) {

        if (err){
          console.log(err);
        } else {        
          var where = query || "";
          if (where.length > 0)
            where = 'where ' + where;
          var q = query;
          console.log('Query: %s', q);
          connection.execute(q, {}, {maxRows: 1000000}, 
              function (err, result) {
                if(err) {

                  connection.release(function (err) {
                    if (err)
                      console.log(err);
                  });
                  callback (err.toString());

                } else {

                  var formatResult = [];

                  for (var index in result.rows) {

                    var row = {};

                    for (var fieldIndex in result.rows[index]) {

                      row[result.metaData[fieldIndex].name] = result.rows[index][fieldIndex];

                    }

                    formatResult.push(row);

                  }
                  connection.release(function (err) {
                    if (err)
                      console.log(err);
                  });
                  callback (null, formatResult);

                }

              });

        }

      });

    } else{

      callback ({ err : 'DataCenter ' + dc + ' inexistente'});

    }

  }else
    callback ({ err : 'Ambiente ' + ambiente + ' inexistente'});
}

var oracledb = require('oracledb');
var config = require('../config');

var pool = {};
console.log('Inicializando Pool de conexiones...');
for (var ambiente in config.ambientes) {

  console.log('\tCreando pool de connexiones para ambiente %s...', ambiente); 
  pool[ambiente] = {};
  for (var dc_index in config.ambientes[ambiente]){

    var dc = config.ambientes[ambiente][dc_index].name;
    console.log('\t\tCreando pool de conexiones para data center %s...', dc);
    var username = config.ambientes[ambiente][dc_index].username;
    var password = config.ambientes[ambiente][dc_index].password;
    var connectString = config.ambientes[ambiente][dc_index].host; 
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

        if (err)
          console.log(err);
        else
          pool[ambiente][dc] = p;

    });
  
  }
}

module.exports = function (ambiente, dc, query, callback){

  if (pool[ambiente]) {

    if (pool[ambiente][dc]) {

      pool[ambiente][dc].getConnection(function(err, connection) {

        if (err)
          console.log(err);
        var where = query || "";
        if (where.length > 0)
          where = 'where ' + where;
        //var q = "select * from " + table + " " + where + " ORDER BY ID";
        var q = query;
        console.log('Query: %s', q);
        connection.execute(q, {}, {maxRows: 1000000}, 
            function (err, result) {
              if(err) {

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
                callback (null, formatResult);

              }

            });

      });

    } else{

      callback ({ err : 'DataCenter ' + dc + ' inexistente'});

    }

  }else
    callback ({ err : 'Ambiente ' + ambiente + ' inexistente'});
}

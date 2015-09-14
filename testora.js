var oracledb = require('oracledb');
var async = require('async');
var _ = require('underscore');
var async = require('async');

/*    oracledb.getConnection( 
      {
        user : 'DTVLA_READONLY',
        password : 'dtvro100',
        connectString : '172.22.126.50:1550/esbdb',
      },
      function (err, connection) {

        if (err) {
          console.log('Error al inicializar conexion');
          console.log(err);
        } else {
          console.log('Ok!!!');
        }


    });*/

var lista = [ 
  {
    ID : 1,
    NOMBRE : 'UNO'
  },
  {
    ID : 2,
    NOMBRE : 'DOS'
  },
  {
    ID : 3,
    NOMBRE : 'TRES'
  }
];

async.eachSeries(lista, function (item, next, index) {
  console.log(index);
  console.log(item);
  next();
});


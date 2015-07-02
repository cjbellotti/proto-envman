var app = require('express')();
var manDB = require('./lib/mandb');

var verif = require('./lib/verifications/01-registros');

app.get('/verificar', function (req, res) {

    var tablas = {
        "target": "PROD",
    "proyecto": "Proyecto Nuevo de Prueba",
    "descripcion": "Descripcion de Proyecto Nuevo de Prueba",
    "registros": {
          "DVM_SISTEMA": [
        {
                  "ID": 10,
          "PAIS": "AR",
          "NOMBRE": "SISTEMA_NUEVO",
          "DESCRIPCION": "Descripcion SISTEMA_NUEVO"
        },
        {
                  "PAIS": "PE",
          "ID": 2,
          "NOMBRE": "MR23",
          "DESCRIPCION": "IBS MR23"
        }
    ],
          "DVM_ENTIDAD_CANONICA": [
                  {
                            "ID": 12346,
                                    "NOMBRE": "ENTIDAD_NUEVA",
                                            "DESCRIPCION": "Descripcion ENTIDAD_NUEVA"
                                                    },
                {
                          "ID": 12347,
                                  "NOMBRE": "NUEVA_ENTIDAD",
                                          "DESCRIPCION": "Descripcion NUEVA_ENTIDAD"
                                                  },
                      {
                                "ID": 4,
                                        "NOMBRE": "METHOD_OF_PAYMENT",
                                                "DESCRIPCION": "Tabla Method_of_payment"
                                                        }
    ],
          "DVM_VALOR_CANONICO": [
                  {
                            "ID": 145,
                                    "ID_ENTIDAD_CANONICA": 12346,
                                            "DESCRIPCION": "Valor XX",
                                                    "VALOR_CANONICO": "XX"
                                                            },
                {
                          "ID": 146,
                                  "ID_ENTIDAD_CANONICA": 12346,
                                          "DESCRIPCION": "Valor ZZ",
                                                  "VALOR_CANONICO": "ZZ"
                                                          },
                      {
                                "ID": 147,
                                        "ID_ENTIDAD_CANONICA": 12346,
                                                "DESCRIPCION": "Valor YY",
                                                        "VALOR_CANONICO": "YY"
                                                                },
                            {
                                      "ID": 71,
                                              "ID_ENTIDAD_CANONICA": 4,
                                                      "VALOR_CANONICO": "X",
                                                              "DESCRIPCION": "X"
                                                                      }
        ],
              "DVM_VALOR_SISTEMA": [
                      {
                                "ID": 255,
                                        "ID_SISTEMA": 10,
                                                "ID_VALOR_CANONICO": 145,
                                                        "ID_ENTIDAD_CANONICA": 12346,
                                                                "VALOR_SISTEMA": "SYSXX\r"
                                                                        },
                    {
                              "ID": 256,
                                      "ID_SISTEMA": 10,
                                              "ID_VALOR_CANONICO": 146,
                                                      "ID_ENTIDAD_CANONICA": 12347,
                                                              "VALOR_SISTEMA": "SYSZZ\r"
                                                                      },
                          {
                                    "ID": 257,
                                            "ID_SISTEMA": 10,
                                                    "ID_VALOR_CANONICO": 147,
                                                            "ID_ENTIDAD_CANONICA": 12346,
                                                                    "VALOR_SISTEMA": "SYSYY\r"
                                                                            },
                                {
                                          "ID": 160,
                                                  "ID_SISTEMA": 2,
                                                          "VALOR_SISTEMA": "77XX",
                                                                  "ID_VALOR_CANONICO": 71,
                                                                          "ID_ENTIDAD_CANONICA": 4
                                                                                  },
                                      {
                                                "ID": 258,
                                                        "ID_SISTEMA": 10,
                                                                "ID_ENTIDAD_CANONICA": 12346,
                                                                        "ID_VALOR_CANONICO": 145,
                                                                                "VALOR_SISTEMA": "XXSYSXX"
                                                                                        }
            ]
                },
      "fecha": "2015-05-18T19:07:23.215Z",
        "job": 12371
    };

    verif(manDB, 'DESA', 'DESA', tablas.registros, function () {

      res.json({ RET : 0})
        .end();

    });

});

module.exports = app;

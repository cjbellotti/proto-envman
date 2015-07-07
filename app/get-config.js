var app = require('express')();

var config = {
    "relationships": {
          "ID_SISTEMA": "DVM_SISTEMA",
              "ID_ENTIDAD_CANONICA": "DVM_ENTIDAD_CANONICA",
                  "ID_VALOR_CANONICO": "DVM_VALOR_CANONICO"
                      },
      "claves": {
            "entidadcanonica": {
                    "NOMBRE": {}
                        },
                "sistema": {
                        "NOMBRE": {},
                              "PAIS": {}
                            },
                    "valorcanonico": {
                            "ID_ENTIDAD_CANONICA": {},
                                  "DESCRIPCION": {}
                                },
                        "valorsistema": {
                                "ID_SISTEMA": {},
                                      "ID_VALOR_CANONICO": {},
                                            "ID_ENTIDAD_CANONICA": {}
                                    },
                            "DVM_ENTIDAD_CANONICA": {
                                    "NOMBRE": {}
                                        },
                                "DVM_SISTEMA": {
                                        "NOMBRE": {},
                                              "PAIS": {}
                                            },
                                    "DVM_VALOR_CANONICO": {
                                            "ID_ENTIDAD_CANONICA": {},
                                                  "DESCRIPCION": {}
                                                },
                                        "DVM_VALOR_SISTEMA": {
                                                "ID_SISTEMA": {},
                                                      "ID_VALOR_CANONICO": {},
                                                            "ID_ENTIDAD_CANONICA": {}
                                                    }
              }
};

app.get('/config', function(req, res) {
  res.json(config)
    .end();
});

module.exports = app;

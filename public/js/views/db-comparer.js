EnvMan.Views.DBComparer = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/db-comparer.html'));

    var configuraciones = {};

    var config = {};
    config.headers = {};
    config.headers.Id = {
      style : {
        width : '5%'
      },
      dataField : 'ID'
    };
    config.headers.Pais = {
      style : {
        width : '7%'
      },
      dataField : 'PAIS'
    };
    config.headers.Nombre = {
      style : {
        width : '35%'
      },
      dataField : 'NOMBRE'
    };
    config.headers.Descripcion = {
      style : {
        width : '54%'
      },
      dataField : 'DESCRIPCION'
    };
    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.DVM_SISTEMA = config;

    config = {};
    config.headers = {};
    config.headers.Id = {
      style : {
        width : '6%'
      },
      dataField : 'ID'
    };
    config.headers.Nombre = {
      style : {
        width : '35%'
      },
      dataField : 'NOMBRE'
    };
    config.headers.Descripcion = {
      style : {
        width : '60%'
      },
      dataField : 'DESCRIPCION'
    };
    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.DVM_ENTIDAD_CANONICA = config;
  
    config = {};
    config.headers = {};
    config.headers.Id = {
      style : {
        width : '6%'
      },
      dataField : 'ID'
    };
    config.headers['Entidad Canonica'] = {
      style : {
        width : '40%'
      },
      dataField : 'ID_ENTIDAD_CANONICA'
    };
    config.headers.Descripcion = {
      style : {
        width : '30%'
      },
      dataField : 'DESCRIPCION'
    };
    config.headers['Valor Canonico'] = {
      style : {
        width : '25%'
      },
      dataField : 'VALOR_CANONICO'
    };
    config.processCell = function (field, content, data, scope) {

      var nombre = content;
      if (field == "ID_ENTIDAD_CANONICA"){

        var entidad = scope.colecciones.DVM_ENTIDAD_CANONICA.get(content);
        if (entidad)
          nombre = entidad.get('NOMBRE');
        else
          nombre = content;

      } 

      return nombre;

    };

    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.DVM_VALOR_CANONICO = config;

    config = {};
    config.headers = {};
    config.headers.Id = {
      style : {
        width : '6%'
      },
      dataField : 'ID'
    };
    config.headers.Sistema = {
      style : {
        width : '15%'
      },
      dataField : 'ID_SISTEMA'
    };
    config.headers.Pais = {
      style : {
        width : '10%'
      },
      dataField : 'PAIS'
    };
    config.headers['Entidad Canonica'] = {
      style : {
        width : '26%'
      },
      dataField : 'ID_ENTIDAD_CANONICA'
    };
    config.headers['Valor Canonico'] = {
      style : {
        width : '20%',
        'margin-left' : '10px'
      },
      dataField : 'ID_VALOR_CANONICO'
    };
    config.headers['Valor Sistema'] = {
      style : {
        width : '24%',
        'margin-left' : '10px'
      },
      dataField : 'VALOR_SISTEMA'
    };
    config.processCell = function (field, content, rowData, scope) {

      var nombre = content;
      if (field == "ID_ENTIDAD_CANONICA"){

        if (parseInt(content)) {

          var entidad = scope.colecciones.DVM_ENTIDAD_CANONICA.get(content);
          if (entidad)
            nombre = entidad.get('NOMBRE');
          else
            nombre = content;

        }


      } else if (field == "ID_SISTEMA") {

        if (parseInt(content)) {

          var sistema = scope.colecciones.DVM_SISTEMA.get(content);
          if (sistema)
            nombre = sistema.get('NOMBRE');
          else
            nombre = content;

        }

      } else if (field == "PAIS") {

        var sistema = scope.colecciones.DVM_SISTEMA.get(rowData.ID_SISTEMA);
        if (!sistema)
          nombre = "Sin Pais";
        else
          nombre = sistema.get('PAIS');		

      } else if (field == "ID_VALOR_CANONICO") {

        if (parseInt(content)) {	

          var valorCanonico = scope.colecciones.DVM_VALOR_CANONICO.get(content);
          if (valorCanonico)
            nombre = valorCanonico.get('VALOR_CANONICO');
          else
            nombre = content;

        }

      } 

      if (!rowData[field])
        rowData[field] = nombre;

      return nombre;

    }

    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.DVM_VALOR_SISTEMA = config;

    config = {};
    config.headers = {};
    config.headers['Category Id'] = {
      style : {
        width : '6%'
      },
      dataField : 'CATEGORYID'
    };
    config.headers['Category Name'] = {
      style : {
        width : '40%'
      },
      dataField : 'CATEGORYNAME'
    };
    config.headers['Canonical Category Code'] = {
      style : {
        width : '30%'
      },
      dataField : 'CANONICALCATEGORYCODE'
    };
    config.processCell = function (field, content) {

      var nombre = content;
      return nombre;

    };

    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.TBL_HOMOLOGATIONCATEGORIES = config;

    config = {};
    config.headers = {};
    config.headers['Country Id'] = {
      style : {
        width : '6%' 
      },
      dataField : 'COUNTRYID'
    };
    config.headers['Canonical Code'] = {
      style : {
        width : '24%'
      },
      dataField : 'CANONICALCODE'
    };
    config.headers['Homologated Concept'] = {
      style : {
        width : '20%'
      },
      dataField : 'HOMOLOGATEDCONCEPT'
    };
    config.headers['Target System Code'] = {
      style : {
        width : '10%'
      },
      dataField : 'TARGETSYSTEMCODE'
    };
    config.headers['Category Id'] = {
      style : {
        width : '20%'
      },
      dataField : 'CATEGORYID'
    };
    config.headers['Homologated Code'] = {
      style : {
        width : '19%'
      },
      dataField : 'HOMOLOGATEDCODE'
    };
    config.processCell = function (field, content) {

      var nombre = content;
      return nombre;

    };

    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.TBL_HOMOLOGATIONDATA = config;

    config = {};
    config.headers = {};
    config.headers.Id = {
        style : {
          width : '6%'
        },
        dataField : 'ID_MESSAGE'
    };
    config.headers.Texto = {
        style : {
          width : '29%'
        },
        dataField : 'TEXT_MESSAGE'
    };
    config.headers.ISO2CODE = {
        style : {
          width : '10%'
        },
        dataField : 'ISO2CODE'
    };
    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.TBL_RESPONSE_MESSAGES_CATALOG = config;

    config = {};
    config.headers = {};
    config.headers.Id = {
        style : {
          width : '6%'
        },
        dataField : 'ID'
    };
    config.headers.Country = {
        style : {
          width : '10%'
        },
        dataField : 'COUNTRY'
    };
    config.headers.Instance = {
        style : {
          width : '10%'
        },
        dataField : 'INSTANCE'
    };
    config.headers.Service = {
        style : {
          width : '10%'
        },
        dataField : 'SERVICE'
    };
    config.headers.Operation = {
        style : {
          width : '10%'
        },
        dataField : 'OPERATION'
    };
    config.headers.TTL = {
        style : {
          width : '5%'
        },
        dataField : 'TTL'
    };
    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.CACHE_CONFIGURATION = config;

    config = {};
    config.headers = {};
    config.headers['Country ID'] = {
        style : {
          width : '6%'
        },
        dataField : 'COUNTRY_ID'
    };
    config.headers['System ID'] = {
        style : {
          width : '10%'
        },
        dataField : 'ID_SYSTEM'
    };
    config.headers['System URL'] = {
        style : {
          width : '10%'
        },
        dataField : 'URL_SYSTEM'
    };
    config.headers['User ID'] = {
        style : {
          width : '10%'
        },
        dataField : 'USER_ID'
    };
    config.headers['User Proof'] = {
        style : {
          width : '10%'
        },
        dataField : 'USER_PROFF'
    };
    config.headers['System DSN'] = {
        style : {
          width : '10%'
        },
        dataField : 'DSN_SYSTEM'
    };
    config.headers['ISO2CODE'] = {
        style : {
          width : '5%'
        },
        dataField : 'ISO2CODE'
    };
    config.headers['ISO3CODE'] = {
        style : {
          width : '5%'
        },
        dataField : 'ISO3CODE'
    };
    config.headers['System Version'] = {
        style : {
          width : '10%'
        },
        dataField : 'SYSTEM_VERSION'
    };
    config.filterable = true;
    config.processRow = function (rowDiv, data) {

      if (data.diff) {
        rowDiv.css('background', '#3385FF');
        rowDiv.addClass('dt-tab-diff');
      } else if (data.new) {
        rowDiv.css('background', '#47D147');
        rowDiv.addClass('dt-tab-new');
      }

    };
    configuraciones.TBL_CONNECTIONS = config;

    this.tablas = [{ colecciones : {} }, { colecciones : {} }];

    for (var n = 0; n < 2;n++) {

      for (var tabla in window.manageData.colecciones) {

        var url = window.manageData.colecciones[tabla].baseURL;
        var model = window.manageData.colecciones[tabla].model;

        this.tablas[n][tabla] = MyTable(configuraciones[tabla]);
        this.tablas[n][tabla].colecciones = this.tablas[n].colecciones;
        this.tablas[n].colecciones[tabla] = new EnvMan.Collections.GenericCollection(url, model);

      }

    }

  },

  events : {

    "change #ambiente1" : "cargarAmbiente",
    "change #tabla1" : "cargarTabla1",
    "change #ambiente2" : "cargarAmbiente",
    "change #tabla2" : "cargarTabla2"

  },

  cargarAmbiente : function () {

    var self = this;
    var espera = new EnvMan.Views.Espera({

      onshow : function () { 

        self.cargarDatos(1, function () {
          self.cargarDatos(2, function () {

            self.compararAmbientes(function () {

              self.cargarTabla(1);
              self.cargarTabla(2);
              espera.hide();

            });

          });

        });

      }

    });
    espera.render();
    espera.show();

  },

  cargarTabla1 : function () {
    var tabla = $('#tabla1').val();
    $('#tabla2').val(tabla);
    this.cargarTabla(1);
    this.cargarTabla(2);
  },

  cargarTabla2 : function () {
    var tabla = $('#tabla2').val();
    $('#tabla1').val(tabla);
    this.cargarTabla(1);
    this.cargarTabla(2);
  },

  cargarAmbiente2 : function () { 
  },

  render : function () {

    var espera = new EnvMan.Views.Espera();
    espera.render();
    espera.show();

    this.$el.html(this.template());
    window.generales.cargarComboAmbientes(this.$el.find('#ambiente1'));
    window.generales.cargarComboAmbientes(this.$el.find('#ambiente2'));
    window.generales.cargarComboTablas(this.$el.find('#tabla1'));
    window.generales.cargarComboTablas(this.$el.find('#tabla2'));

    var self = this;
    this.cargarDatos(1, function () {
      self.cargarDatos(2, function () {

        self.compararAmbientes(function () {

          self.cargarTabla(1);
          self.cargarTabla(2);
          espera.hide();

        });

      });

    });

  },

  cargarTabla : function (n) {

      var self = this;
      var ambiente = this.$el.find('#ambiente' + n).val();
      var tabla = this.$el.find('#tabla' + n).val();

      self.$el.find('.table-container' + n).html('');
      self.$el.find('.table-container' + n).append(self.tablas[n - 1][tabla]);

  },

  cargarDatos : function (n, callback) {

    var ambiente = this.$el.find('#ambiente' + n).val();
    var tabla = this.$el.find('#tabla' + n).val();

    for (var tabla in this.tablas[n - 1].colecciones) {

      window.job.target = ambiente;
      this.tablas[n - 1].colecciones[tabla].fetch({ async : false });

    }

    callback();

  },

  compararAmbientes : function (callback) {
    
    var self = this;
    var ambientes = [];
    var indexAmbiente = 0;
    ambientes.push(this.$el.find('#ambiente1').val());
    ambientes.push(this.$el.find('#ambiente2').val());
    $.get('/comparar/' + ambientes[0] + '/' + ambientes[1], function (data) {
      async.each(ambientes, function (ambiente, nextAmbiente) {

        async.each(_.keys(data[ambiente]), function (tabla, nextTabla) {

          var array = self.tablas[indexAmbiente].colecciones[tabla].toJSON();
          async.each(data[ambiente][tabla].faltantes, function (registro, nextRegistro) {

            registro.new = true;
            array.push(registro);
            nextRegistro();

          }, function () {

            async.each(data[ambiente][tabla].diferentes, function (registro, nextRegistro) {

              //registro.diff = true;
              //array.push(registro);

              var index = _.findIndex(array, registro);
              array[index].diff = true;
              nextRegistro();

            }, function () {

              self.tablas[indexAmbiente][tabla].setArrayDataAsync(array, {}, function () {
                nextTabla();
              });

            });

          });
        }, function () {

          indexAmbiente++;
          nextAmbiente();

        });

      }, callback);

    });

  }

});

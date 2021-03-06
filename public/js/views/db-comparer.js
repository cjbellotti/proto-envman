EnvMan.Views.DBComparer = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/db-comparer.html'));

    this.tablas = [{}, {}];

    for (var n = 0; n < 2;n++) {

      this.tablas[n].sistemas = new EnvMan.Collections.Sistemas();
      this.tablas[n].entidades = new EnvMan.Collections.Entidades();
      this.tablas[n].valoresCanonicos = new EnvMan.Collections.ValoresCanonicos();
      this.tablas[n].valoresSistema = new EnvMan.Collections.ValoresSistema();
      this.tablas[n].tblHomologationCategories = new EnvMan.Collections.TblHomologationCategories();
      this.tablas[n].tblHomologationData = new EnvMan.Collections.TblHomologationData();

    }

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
    this.tablas[0].DVM_SISTEMA = MyTable(config);
    this.tablas[1].DVM_SISTEMA = MyTable(config);

    this.tablas[0].DVM_SISTEMA.coleccion = this.tablas[0].sistemas;
    this.tablas[1].DVM_SISTEMA.coleccion = this.tablas[1].sistemas;

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

    this.tablas[0].DVM_ENTIDAD_CANONICA = MyTable(config);
    this.tablas[1].DVM_ENTIDAD_CANONICA = MyTable(config);

    this.tablas[0].DVM_ENTIDAD_CANONICA.coleccion = this.tablas[0].entidades;
    this.tablas[1].DVM_ENTIDAD_CANONICA.coleccion = this.tablas[1].entidades;

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

        var entidad = scope.entidades.get(content);
        if (entidad)
          nombre = entidad.get('NOMBRE');
        else
          nombre = content;

      } 

      return nombre;

    };

    config.filterable = true;
    this.tablas[0].DVM_VALOR_CANONICO = MyTable(config);
    this.tablas[1].DVM_VALOR_CANONICO = MyTable(config);

    this.tablas[0].DVM_VALOR_CANONICO.entidades = this.tablas[0].entidades;
    this.tablas[1].DVM_VALOR_CANONICO.entidades = this.tablas[1].entidades;

    this.tablas[0].DVM_VALOR_CANONICO.coleccion = this.tablas[0].valoresCanonicos;
    this.tablas[1].DVM_VALOR_CANONICO.coleccion = this.tablas[0].valoresCanonicos;

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

          var entidad = scope.entidades.get(content);
          if (entidad)
            nombre = entidad.get('NOMBRE');
          else
            nombre = content;

        }


      } else if (field == "ID_SISTEMA") {

        if (parseInt(content)) {

          var valorCanonico = scope.sistemas.get(content);
          if (valorCanonico)
            nombre = valorCanonico.get('NOMBRE');
          else
            nombre = content;

        }

      } else if (field == "PAIS") {

        var sistema = scope.sistemas.get(rowData.ID_SISTEMA);
        if (!sistema)
          nombre = "Sin Pais";
        else
          nombre = sistema.get('PAIS');		

      } else if (field == "ID_VALOR_CANONICO") {

        if (parseInt(content)) {	

          var valorCanonico = scope.valoresCanonicos.get(content);
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
    this.tablas[0].DVM_VALOR_SISTEMA = MyTable(config);
    this.tablas[1].DVM_VALOR_SISTEMA = MyTable(config);

    this.tablas[0].DVM_VALOR_SISTEMA.sistemas = this.tablas[0].sistemas;
    this.tablas[0].DVM_VALOR_SISTEMA.entidades = this.tablas[0].entidades;
    this.tablas[0].DVM_VALOR_SISTEMA.valoresCanonicos = this.tablas[0].valoresCanonicos;

    this.tablas[1].DVM_VALOR_SISTEMA.sistemas = this.tablas[1].sistemas;
    this.tablas[1].DVM_VALOR_SISTEMA.entidades = this.tablas[1].entidades;
    this.tablas[1].DVM_VALOR_SISTEMA.valoresCanonicos = this.tablas[1].valoresCanonicos;

    this.tablas[0].DVM_VALOR_SISTEMA.coleccion = this.tablas[0].valoresSistema;
    this.tablas[1].DVM_VALOR_SISTEMA.coleccion = this.tablas[1].valoresSistema;

    var config = {};
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
    this.tablas[0].TBL_HOMOLOGATIONCATEGORIES = MyTable(config);
    this.tablas[1].TBL_HOMOLOGATIONCATEGORIES = MyTable(config);

    this.tablas[0].TBL_HOMOLOGATIONCATEGORIES.coleccion = this.tablas[0].tblHomologationCategories;
    this.tablas[1].TBL_HOMOLOGATIONCATEGORIES.coleccion = this.tablas[1].tblHomologationCategories;

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
    this.tablas[0].TBL_HOMOLOGATIONDATA = MyTable(config);
    this.tablas[1].TBL_HOMOLOGATIONDATA = MyTable(config);

    this.tablas[0].TBL_HOMOLOGATIONDATA.coleccion = this.tablas[0].tblHomologationData;
    this.tablas[1].TBL_HOMOLOGATIONDATA.coleccion = this.tablas[1].tblHomologationData;
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

    this.tablas[n - 1].sistemas.fetchAmb(ambiente, { async : false });
    this.tablas[n - 1].entidades.fetchAmb(ambiente, { async : false });
    this.tablas[n - 1].valoresCanonicos.fetchAmb(ambiente, { async : false });
    this.tablas[n - 1].valoresSistema.fetchAmb(ambiente, { async : false });

    callback();

  },

  compararAmbientes : function (callback) {

    var self = this;
    async.eachSeries(_.keys(window.defTablas), function (tabla, next) {

      var datos1 = self.tablas[0][tabla].coleccion.toJSON();
      var datos2 = self.tablas[1][tabla].coleccion.toJSON();

      window.compararTablas(tabla, datos1, datos2);

      console.log('Inicio cargar de tabla %s : %s', tabla, Date());
      self.tablas[0][tabla].setArrayDataAsync(datos1, {}, function () {

        self.tablas[1][tabla].setArrayDataAsync(datos2, {}, function () {

          console.log('Fin cargar de tabla %s : %s', tabla, Date());
          next();

        });

      });

    }, callback);

  }

});

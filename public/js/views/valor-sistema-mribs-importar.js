EnvMan.Views.ValorSistemaImportarMRIBS = Backbone.View.extend({

  className : "modal fade",
  attributes : {
    "aria-hidden" : "true",
    "style" : "z-index: 1100"
  },

  initialize : function (config) {

    this.template = swig.compile(getTemplate('templates/valor-sistema-importar.html'));
    this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
    this.env = config.env;

    var config = {};
    config.tableName = "DVM_VALOR_SISTEMA_MRIBS";
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
        width : '30%'
      },
      dataField : 'ID_ENTIDAD_CANONICA'
    };
    config.headers['Valor Canonico'] = {
      style : {
        width : '15%',
        'margin-left' : '10px'
      },
      dataField : 'ID_VALOR_CANONICO'
    };
    config.headers['Valor Sistema'] = {
      style : {
        width : '15%',
        'margin-left' : '10px'
      },
      dataField : 'VALOR_SISTEMA'
    };
    config.selectable = true;
    config.processCell = function (field, content, rowData) {

      var nombre = content;
      if (field == "ID_ENTIDAD_CANONICA"){

        if (parseInt(content)) {

          var entidad = window.manageData.get('DVM_ENTIDAD_CANONICA_MRIBS', { ID : content });
          if (entidad)
            nombre = entidad.get('NOMBRE');
          else
            nombre = content;

        }


      } else if (field == "ID_SISTEMA") {

        if (parseInt(content)) {

          var valorCanonico = window.manageData.get('DVM_SISTEMA_MRIBS', { ID : content });
          if (valorCanonico)
            nombre = valorCanonico.get('NOMBRE');
          else
            nombre = content;

        }

      } else if (field == "PAIS") {

        var sistema = window.manageData.get('DVM_SISTEMA_MRIBS', { ID : rowData.ID_SISTEMA });
        if (!sistema)
          nombre = "Sin Pais";
        else
          nombre = sistema.get('PAIS');		

      } else if (field == "ID_VALOR_CANONICO") {

        if (parseInt(content)) {	

          var valorCanonico = window.manageData.get('DVM_VALOR_CANONICO_MRIBS', { ID : rowData.ID_VALOR_CANONICO });
          if (valorCanonico)
            nombre = valorCanonico.get('VALOR_CANONICO');
          else
            nombre = content;

        }

      } 

      return nombre;

    }

    this.table = MyTable(config);

  },

  events : {

    "change #ambiente" : "cargarDatos",		
    "change #pais" : "cargarSistemas",
    "change #id-entidad" : "cargarTabla",
    "change #id-sistema" : "cargarTabla",
    "click #importar" : "onImportar"

  },

  onImportar : function (e) {

    this.onImportarFunction(this);

  },

  cargarSistemas : function (e) {

    var ambiente = this.$el.find('#ambiente').val();
    var pais = this.$el.find('#pais').val();

    window.generales.cargarComboSistemas(this.$el.find('#id-sistema'), window.job.target, '*', pais);
    this.cargarTabla();

  },

  cargarDatos : function (e) {

    var ambiente = this.$el.find('#ambiente').val();
    var self = this;
    var espera = new EnvMan.Views.Espera({

      onshow : function () {

        self.lista = window.generales.datos.valoresSistema(ambiente);
        espera.hide();

        self.cargarTabla();

      },

      onclose : function () {
      }
    });
    $('#models').append(espera.el);
    espera.render();
    espera.show();

  },

  cargarTabla : function (e) {

    var ambiente = this.$el.find('#ambiente').val();
    var pais = this.$el.find('#pais').val();
    var sistema = this.$el.find('#id-sistema').val();
    var entidad = this.$el.find('#id-entidad').val();
    var self = this;

    var espera = new EnvMan.Views.Espera();
    $('#modals').append(espera.el);
    espera.render();
    espera.show();
    window.generales.datosTabla('DVM_VALOR_SISTEMA_MRIBS', ambiente, function (lista) {

      var arrayData = [];
      for (var index in lista) {

        if (_.findIndex(job.registros['DVM_VALOR_SISTEMA_MRIBS'], lista[index]) < 0 &&
              (lista[index].ID_SISTEMA == sistema || sistema == '*') &&
              (lista[index].ID_ENTIDAD_CANONICA == entidad || entidad == '*'))
          arrayData.push(lista[index]);
      }

      self.table.setArrayData(arrayData);
      espera.hide();

    });

  },

  render : function () {

    // Solo cargo en la tabla los sistemas que NO se encuentren en el Job.

    this.$el.html(this.template());

    window.generales.cargarComboAmbientes(this.$el.find('#ambiente'));

    this.$el.find('#ambiente').val(window.job.target);

    window.generales.cargarComboPaises(this.$el.find('#pais'), window.job.target, '*');
    window.generales.cargarComboSistemas(this.$el.find('#id-sistema'), window.job.target, '*');
    window.generales.cargarComboEntidades(this.$el.find('#id-entidad'), window.job.target, '*');

    if (window.job.target != 'DESA')
      this.$el.find('#ambiente').attr('disabled', 'disabled');

    this.$el.find('.table-valor-sistema-importar').append(this.table);

    this.cargarDatos();

    var self = this;
    this.$el.on('hidden.bs.modal', function () {
      self.$el.remove();
    });

  }

});

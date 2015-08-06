EnvMan.Views.DBComparer = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/db-comparer.html'));

    this.tablas = [{}, {}];

    for (var n = 0; n < 2;n++) {

      this.tablas[n].sistemas = new EnvMan.Collections.Sistemas();
      this.tablas[n].entidades = new EnvMan.Collections.Entidades();
      this.tablas[n].valoresCanonicos = new EnvMan.Collections.ValoresCanonicos();
      this.tablas[n].valoresSistema = new EnvMan.Collections.ValoresSistema();

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

        var entidad = this.entidades.get(content);
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
    this.tablas[0].DVM_VALOR_CANONICO.entidades = new EnvMan.Collections.Entidades();
    this.tablas[1].DVM_VALOR_CANONICO.entidades = new EnvMan.Collections.Entidades();

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
    config.processCell = function (field, content, rowData) {

      var nombre = content;
      if (field == "ID_ENTIDAD_CANONICA"){

        if (parseInt(content)) {

          var entidad = window.collections.entidades.get(content);
          if (entidad)
            nombre = entidad.get('NOMBRE');
          else
            nombre = content;

        }


      } else if (field == "ID_SISTEMA") {

        if (parseInt(content)) {

          var valorCanonico = window.collections.sistemas.get(content);
          if (valorCanonico)
            nombre = valorCanonico.get('NOMBRE');
          else
            nombre = content;

        }

      } else if (field == "PAIS") {

        var sistema = window.collections.sistemas.get(rowData.ID_SISTEMA);
        if (!sistema)
          nombre = "Sin Pais";
        else
          nombre = sistema.get('PAIS');		

      } else if (field == "ID_VALOR_CANONICO") {

        if (parseInt(content)) {	

          var valorCanonico = window.collections.valoresCanonicos.get(content);
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
  },

  events : {

    "change #ambiente1" : "cargarAmbiente1",
    "change #tabla1" : "cargarAmbiente1",
    "change #ambiente2" : "cargarAmbiente2",
    "change #tabla2" : "cargarAmbiente2"

  },

  cargarAmbiente1 : function () {
    var tabla = $('#tabla1').val();
    $('#tabla2').val(tabla);
    this.cargarTabla(1);
    this.cargarTabla(2);
  },

  cargarAmbiente2 : function () {
    var tabla = $('#tabla2').val();
    $('#tabla1').val(tabla);
    this.cargarTabla(1);
    this.cargarTabla(2);
  },

  render : function () {

    this.$el.html(this.template());
    window.generales.cargarComboAmbientes(this.$el.find('#ambiente1'));
    window.generales.cargarComboAmbientes(this.$el.find('#ambiente2'));
    window.generales.cargarComboTablas(this.$el.find('#tabla1'));
    window.generales.cargarComboTablas(this.$el.find('#tabla2'));

    this.cargarTabla(1);
    this.cargarTabla(2);

  },

  cargarTabla : function (n) {

      var espera = new EnvMan.Views.Espera();
      espera.render();
      espera.show();

      var self = this;
      var ambiente = this.$el.find('#ambiente' + n).val();
      var tabla = this.$el.find('#tabla' + n).val();

      window.collections.sistemas.fetchData(ambiente, { async : false });
      window.collections.entidades.fetchData(ambiente, { async : false });
      window.collections.valoresCanonicos.fetchData(ambiente, { async : false });

      $.get('/' + window.defTablas[tabla].alias + '/' + ambiente, function (data) {

        self.$el.find('.table-container' + n).html('');
        self.$el.find('.table-container' + n).append(self.tablas[n - 1][tabla]);
        data[5].diff = true;
        data[10].new = true;
        self.tablas[n - 1][tabla].setArrayData(data);
        espera.hide();

      });
  },

  compararAmbientes : function () {

    var ambiente1 = $('#ambiente1').val();
    var tabla1 = $('#tabla1').val();

    var ambiente2 = $('#ambiente2').val();
    var tabla2 = $('#tabla2').val();

  }

});

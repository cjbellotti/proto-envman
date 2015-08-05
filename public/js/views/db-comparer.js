EnvMan.Views.DBComparer = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/db-comparer.html'));

    this.tablas = [{}, {}];

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
    config.processCell = function (field, content) {

      var nombre = content;
      if (field == "ID_ENTIDAD_CANONICA"){

        var entidad = window.collections.entidades.get(content);
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
    this.cargarTabla(1);
  },

  cargarAmbiente2 : function () {
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

      window.job.target = ambiente;
      window.collections.sistemas.fetchData({ async : false });
      window.collections.entidades.fetchData({ async : false });
      window.collections.valoresCanonicos.fetchData({ async : false });

      $.get('/' + window.defTablas[tabla].alias + '/' + ambiente, function (data) {

        self.$el.find('.table-container' + n).html('');
        self.$el.find('.table-container' + n).append(self.tablas[n - 1][tabla]);
        self.tablas[n - 1][tabla].setArrayData(data);
        espera.hide();

      });
  }

});

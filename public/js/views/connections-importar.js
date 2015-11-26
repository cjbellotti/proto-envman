EnvMan.Views.ConnectionsImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {
		this.template = swig.compile(getTemplate('templates/connections-importar.html'));
		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
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
		config.selectable = true;
		this.table = MyTable(config);

	},

	events : {

		"change #ambiente" : "cargarTabla",	
		"click #importar" : "onImportar"

	},

	onImportar : function (e) {

		this.onImportarFunction(this);

	},

	cargarTabla : function (e) {

			var ambiente = this.$el.find('#ambiente').val();

			var espera = new EnvMan.Views.Espera();
			$('#modals').append(espera.el);
			espera.render();
			espera.show();
      var self = this;
      window.generales.datosTabla('TBL_CONNECTIONS', ambiente, function (lista) {

        espera.hide();

        var arrayData = [];
        for (var index in lista) {
          if (_.findIndex(job.registros['TBL_CONNECTIONS'], lista[index]) < 0)
            arrayData.push(lista[index]);
        }

        self.table.setArrayData(arrayData);

      });
			
	},

	render : function () {

		this.$el.html(this.template());

		window.generales.cargarComboAmbientes(this.$el.find('#ambiente'));

		this.$el.find('#ambiente').val(window.job.target);

		if (window.job.target != 'DESA')
			this.$el.find('#ambiente').attr('disabled', 'disabled');

		this.cargarTabla();	

		this.$el.find('.table-entidad-importar').append(this.table);

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});

EnvMan.Views.CacheConfigurationImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {
		this.template = swig.compile(getTemplate('templates/cache-configuration-importar.html'));
		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
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
      window.generales.datosTabla('CACHE_CONFIGURATION', ambiente, function (lista) {

        espera.hide();

        var arrayData = [];
        for (var index in lista) {
          if (_.findIndex(job.registros['CACHE_CONFIGURATION'], lista[index]) < 0)
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

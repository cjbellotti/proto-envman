EnvMan.Views.EntidadImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {
		this.template = swig.compile(getTemplate('templates/entidad-importar.html'));
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
    config.headers.Nombre = {
      style : {
        width : '40%'
      },
      dataField  : 'NOMBRE'
    };
    config.headers.Descripcion = {
      style : {
        width : '48%'
      },
      dataField : 'DESCRIPCION'
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
      window.generales.datosTabla('DVM_ENTIDAD_CANONICA', ambiente, function (lista) {

        espera.hide();

        var arrayData = [];
        for (var index in lista) {
          if (_.findIndex(job.registros['DVM_ENTIDAD_CANONICA'], lista[index]) < 0)
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

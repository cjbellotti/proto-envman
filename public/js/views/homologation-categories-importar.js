EnvMan.Views.HomologationCategoriesImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {
		this.template = swig.compile(getTemplate('templates/homologation-categories-importar.html'));
		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
    config.headers = {};
	    config.headers['Id'] = {
	      style : {
	        width : '29%'
	      },
	      dataField : 'CATEGORYID'
	    };
	    config.headers['Categoria Canonica'] = {
	      style : {
	        width : '29%'
	      },
	      dataField : 'CANONICALCATEGORYCODE'
	    };
	    config.headers['Nombre'] = {
	      style : {
	        width : '38%'
	      },
	      dataField : 'CATEGORYNAME'
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
      window.generales.datosTabla('TBL_HOMOLOGATIONCATEGORIES', ambiente, function (lista) {

        espera.hide();

        var arrayData = [];
        for (var index in lista) {
          if (_.findIndex(job.registros['TBL_HOMOLOGATIONCATEGORIES'], lista[index]) < 0)
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
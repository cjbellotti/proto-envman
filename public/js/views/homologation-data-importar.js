EnvMan.Views.HomologationDataImportar = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function (config) {
		
		this.template = swig.compile(getTemplate('templates/homologation-data-importar.html'));
		this.onImportarFunction = config.onImportar || function (env) { console.log("No Implementado.")};
		this.env = config.env;

		var config = {}
    config.tableName = "DVM_VALOR_CANONICO";
    config.headers = {};
	    config.headers['Country ID'] = {
	      style : {
	        width : '10%'
	      },
	      dataField : 'COUNTRYID'
	    };
	    config.headers['Canonical Code'] = {
	      style : {
	        width : '15%'
	      },
	      dataField : 'CANONICALCODE'
	    };
	    config.headers['Concept'] = {
	      style : {
	        width : '15%'
	      },
	      dataField : 'HOMOLOGATEDCONCEPT'
	    };
	     config.headers['Target System'] = {
	      style : {
	        width : '15%'
	      },
	      dataField : 'TARGETSYSTEMCODE'
	    };
	     config.headers['Homologated Code'] = {
	      style : {
	        width : '15%'
	      },
	      dataField : 'HOMOLOGATEDCODE'
	    };
	     config.headers['Categoria'] = {
	      style : {
	        width : '25%'
	      },
	      dataField : 'CATEGORYID'
	    };
		config.selectable = true;
		config.processCell = function (field, content) {

			var nombre = content;
			if (field == "CATEGORYID"){

				var categoria = window.manageData.get('TBL_HOMOLOGATIONCATEGORIES',{ CATEGORYID : content});
				if (categoria)
					nombre = categoria.get('CATEGORYNAME');
				else
					nombre = content;

			} 

			return nombre;

		}

		this.table = MyTable(config);

	},

	events : {

		"change #ambiente" : "cargarTabla",		
		"change #category-id" : "cargarTabla",
		"click #importar" : "onImportar"

	},

	onImportar : function (e) {

		this.onImportarFunction(this);

	},

	cargarTabla : function (e) {

			var lista;
			var ambiente = this.$el.find('#ambiente').val();
			var categoria = this.$el.find('#category-id').val();

			var espera = new EnvMan.Views.Espera();
			$('#modals').append(espera.el);
			espera.render();
			espera.show();
      var self = this;
      window.generales.datosTabla('TBL_HOMOLOGATIONDATA', ambiente, function (lista) {

          var arrayData = [];
          for (var index in lista) {
            if ((_.findIndex(job.registros.sistema, lista[index]) < 0 &&
                    lista[index].CATEGORYID == categoria) || categoria == '*')
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

		window.generales.cargarComboHomologationCategories(this.$el.find('#category-id'), window.job.target, '*');

		if (window.job.target != 'DESA')
			this.$el.find('#ambiente').attr('disabled', 'disabled');

		this.$el.find('.table-valor-canonico-importar').append(this.table);

		this.cargarTabla();

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});

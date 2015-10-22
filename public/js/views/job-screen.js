EnvMan.Views.JobV2 = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1060"
	},

	initialize : function () {
	
		this.template = swig.compile( getTemplate('templates/job-screen-v2.html') );

	},

	events : {
		"click .fase-anterior" : "faseAnterior",
		"click .siguiente-fase" : "siguienteFase",
		"click #aceptar" : "guardar",
		"click #verificar" : "verificar",
		"click #importar" : "importar"
	},

	faseAnterior : function (e) {

		e.preventDefault();
		var index = window.Fases.indexOf(window.job.target);
		if (index >= 0) {
			index--;
			window.job.target = window.Fases[index];
			this.$el.find('.btn-group button:not(.disabled)').addClass('disabled');
			this.$el.find('#' + job.target + ' button').removeClass('disabled');
		}

	},

	siguienteFase : function (e) {

		e.preventDefault();
		var index = window.Fases.indexOf(window.job.target);
		if (index >= 0) {
			index++;
			window.job.target = window.Fases[index];
			this.$el.find('.btn-group button:not(.disabled)').addClass('disabled');
			this.$el.find('#' + job.target + ' button').removeClass('disabled');
		}

	},

	mostrarTablaSistemas : function (e) {

		this.$el.find('#tabSistemas').addClass('active');
		this.$el.find('#tabEntidades').removeClass('active');
		this.$el.find('#tabValoresSistema').removeClass('active');
		this.$el.find('#tabValoresCanonicos').removeClass('active');

		var configTable = {};
                configTable.headers = {};
                configTable.headers.Id = {
                  style : {
                    width : '6%'
                  },
                  dataField : 'ID'
                };
                configTable.headers.Pais = {
                  style : {
                    width : '14%'
                  },
                  dataField : 'PAIS'
                };
                configTable.headers.Nombre = {
                  style : {
                    width : '30%'
                  },
                  dataField : 'NOMBRE'
                };
                configTable.headers.Descripcion = {
                  style : {
                    width : '45%'
                  },
                  dataField : 'DESCRIPCION'
                };
		configTable.arrayData = job.registros.sistema;
		configTable.title = "Sistema";
		configTable.table = "sistema";
		configTable.model = EnvMan.Models.Sistema;
		configTable.view = EnvMan.Views.Sistema;
		configTable.viewImport = EnvMan.Views.SistemaImportar;

		var sistemasTable = crearTabla(configTable);

		sistemasTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(sistemasTable.$el);

	},

	mostrarTablaEntidades : function (e) {

		this.$el.find('#tabSistemas').removeClass('active');
		this.$el.find('#tabEntidades').addClass('active');
		this.$el.find('#tabValoresSistema').removeClass('active');
		this.$el.find('#tabValoresCanonicos').removeClass('active');

		var configTable = {};

    configTable.headers = {};
    configTable.headers.Id = {
        style : {
          width : '6%'
        },
        dataField : 'ID'
    };
    configTable.headers.Nombre = {
        style : {
          width : '29%'
        },
        dataField : 'NOMBRE'
    };
    configTable.headers.Descripcion = {
        style : {
          width : '61%'
        },
        dataField : 'DESCRIPCION'
    };
		configTable.arrayData = job.registros.entidadcanonica;
		configTable.title = "Entidad Canonica";
		configTable.table = "entidadcanonica";
		configTable.model = EnvMan.Models.Entidad;
		configTable.view = EnvMan.Views.Entidad;
		configTable.viewImport = EnvMan.Views.EntidadImportar;

		var entidadesTable = crearTabla(configTable);

		entidadesTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(entidadesTable.$el);

	},

	mostrarTablaValorSistema : function (e) {

		this.$el.find('#tabSistemas').removeClass('active');
		this.$el.find('#tabEntidades').removeClass('active');
		this.$el.find('#tabValoresSistema').addClass('active');
		this.$el.find('#tabValoresCanonicos').removeClass('active');

		var configTable = {};

    configTable.headers = {};
    configTable.headers.Id = {
      style : {
        width : '6%'
      },
      dataField : 'ID'
    };
    configTable.headers.Sistema = {
      style : {
        width : '20%'
      },
      dataField : 'ID_SISTEMA'
    };
    configTable.headers.Pais = {
      style : {
        width : '9%'
      },
      dataField : 'PAIS'
    };
    configTable.headers['Entidad Canonica'] = {
      style : {
        width : '20%'
      },
      dataField : 'ID_ENTIDAD_CANONICA'
    };
    configTable.headers['Valor Canonico'] = {
      style : {
        width : '20%'
      },
      dataField : 'ID_VALOR_CANONICO'
    };
    configTable.headers['Valor Sistema'] = {
      style : {
        width : '20%',
        'margin-left' : '5px',
        'text-align' : 'center'

      },
      dataField : 'VALOR_SISTEMA'
    };
		configTable.arrayData = job.registros.valorsistema;
		configTable.title = "Valor Sistema";
		configTable.table = "valorsistema";
		configTable.model = EnvMan.Models.ValorSistema;
		configTable.view = EnvMan.Views.ValorSistema;
		configTable.viewImport = EnvMan.Views.ValorSistemaImportar;
		configTable.processCell = function (field, content, rowData) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.collections.entidades.get(content);
				if (!entidad)
					nombre = "Entidad " + content + " inexistente.";
				else
					nombre = entidad.get('NOMBRE');

			} else if (field == "ID_SISTEMA") {

				var sistema = window.collections.sistemas.get(content);
				if (!sistema)
					nombre = "Sistema " + content + " inexistente.";
				else
					nombre = sistema.get('NOMBRE');

			} else if (field == "ID_VALOR_CANONICO") {

				var valorCanonico = window.collections.valoresCanonicos.get(content);
				if (!valorCanonico)
					nombre = "Valor Canonico " + content + " inexistente.";
				else
					nombre = valorCanonico.get('VALOR_CANONICO');

			} else if (field == 'PAIS') {

				var sistema = window.collections.sistemas.get(rowData.ID_SISTEMA);
				if (!sistema)
					nombre = "Sin Pais";
				else
					nombre = sistema.get('PAIS');		
			}

			return nombre;

		}

		var valorSistemaTable = new crearTabla(configTable);

		valorSistemaTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(valorSistemaTable.$el);

	},

	mostrarTablaValorCanonico : function (e) {

		this.$el.find('#tabSistemas').removeClass('active');
		this.$el.find('#tabEntidades').removeClass('active');
		this.$el.find('#tabValoresSistema').removeClass('active');
		this.$el.find('#tabValoresCanonicos').addClass('active');

		var configTable = {};

    configTable.headers = {};
    configTable.headers.Id = {
      style : {
        width : '6%'
      },
      dataField : 'ID'
    };
    configTable.headers['Entidad Canonica'] = {
      style : {
        width : '29%'
      },
      dataField : 'ID_ENTIDAD_CANONICA'
    };
    configTable.headers['Descripcion'] = {
      style : {
        width : '40%'
      },
      dataField : 'DESCRIPCION'
    };
    configTable.headers['Valor Canonico'] = {
      style : {
        width : '20%'
      },
      dataField : 'VALOR_CANONICO'
    };
		configTable.arrayData = job.registros.valorcanonico;
		configTable.title = "Valor Canonico";
		configTable.table = "valorcanonico";
		configTable.model = EnvMan.Models.ValorCanonico;
		configTable.view = EnvMan.Views.ValorCanonico;
		configTable.viewImport = EnvMan.Views.ValorCanonicoImportar;
		configTable.processCell = function (field, content) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.collections.entidades.get(content);

				if (!entidad)
					nombre = "Entidad " + content + " inexistente.";
				else
					nombre = entidad.get('NOMBRE');


			}

			return nombre;

		}

		var valorCanonicoTable = new crearTabla(configTable);

		valorCanonicoTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(valorCanonicoTable.el);

	},

	guardar : function (e) {

	},

	verificar : function (e) {

	},

	importar : function (e) {

	},

	render : function (job) {

		this.$el.html(this.template(job));
		this.$el.find('#' + job.target + ' button').removeClass('disabled');
		this.mostrarTablaSistemas();

		if (window.job.job != '')
				this.$el.find('#importar').attr('disabled', 'disabled');
	}

});


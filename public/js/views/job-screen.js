EnvMan.Views.JobV2 = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1060"
	},

	initialize : function () {
	
		this.template = swig.compile( getTemplate('templates/job-screen-v2.html') );
    window.manageData.reset();
    window.manageData.fetch({
        success : function () {

          window.generales.cargarColeccionesV2();
          var self = this;
          $.post('/verificar/' + window.job.job, function (data) {

              var dc;
              for (dc in data);
              
              for (var tabla in data[0]) {

                for (var index in data[tabla]) {

                  var modelData = {};
                  for (var field in data[tabla][index]) {

                    if (field != 'IDN' && field != 'origen') {

                      modelData[field] = data[tabla][index][field];

                    }

                  }

                  var model = new window.manageData.colecciones[tabla].model(modelData);

                  if (data[tabla][index].IDN) {

                    window.manageData.colecciones[tabla].add(model);

                  } else if (data[tabla][index].MOD) {

                    window.manageData.colecciones[tabla].set(model, { remove : false });
                    
                  }

                }

              }

          });

        }

    });

	},

	events : {
		"click .fase-anterior" : "faseAnterior",
		"click .siguiente-fase" : "siguienteFase",
		"click #aceptar" : "guardar",
		"click #verificar" : "verificar",
		"click #importar" : "importar",
		"click #dvmSistema" : "mostrarTablaSistemas",
		"click #dvmEntidadCanonica" : "mostrarTablaEntidades",
		"click #dvmValorCanonico" : "mostrarTablaValorCanonico",
		"click #dvmValorSistema" : "mostrarTablaValorSistema",
		"click #tblResponseMCatalog" :"mostrarTablaTblResponse"
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
		configTable.arrayData = job.registros.DVM_SISTEMA;
		configTable.title = "Sistema";
		configTable.table = "DVM_SISTEMA";
		configTable.model = manageData.colecciones.DVM_SISTEMA.model;
		configTable.view = EnvMan.Views.Sistema;
		configTable.viewImport = EnvMan.Views.SistemaImportar;

		var sistemasTable = crearTabla(configTable);

		sistemasTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(sistemasTable.$el);

	},

	mostrarTablaEntidades : function (e) {

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
		configTable.arrayData = job.registros.DVM_ENTIDAD_CANONICA;
		configTable.title = "Entidad Canonica";
		configTable.table = "DVM_ENTIDAD_CANONICA";
		configTable.model = manageData.colecciones.DVM_ENTIDAD_CANONICA.model; 
		configTable.view = EnvMan.Views.Entidad;
		configTable.viewImport = EnvMan.Views.EntidadImportar;

		var entidadesTable = crearTabla(configTable);

		entidadesTable.render();
		this.$el.find('.tab-content').html('');
		this.$el.find('.tab-content').append(entidadesTable.$el);

	},

	mostrarTablaValorSistema : function (e) {

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
		configTable.arrayData = job.registros.DVM_VALOR_SISTEMA;
		configTable.title = "Valor Sistema";
		configTable.table = "DVM_VALOR_SISTEMA";
		configTable.model = manageData.colecciones.DVM_VALOR_SISTEMA.model;
		configTable.view = EnvMan.Views.ValorSistema;
		configTable.viewImport = EnvMan.Views.ValorSistemaImportar;
		configTable.processCell = function (field, content, rowData) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.manageData.get('DVM_ENTIDAD_CANONICA',{ ID : content});
				if (!entidad)
					nombre = "Entidad " + content + " inexistente.";
				else
					nombre = entidad.get('NOMBRE');

			} else if (field == "ID_SISTEMA") {

				var sistema = window.manageData.get('DVM_SISTEMA', { ID : content });
				if (!sistema)
					nombre = "Sistema " + content + " inexistente.";
				else
					nombre = sistema.get('NOMBRE');

			} else if (field == "ID_VALOR_CANONICO") {

				var valorCanonico = window.manageData.get('DVM_VALOR_CANONICO', { ID : content });
				if (!valorCanonico)
					nombre = "Valor Canonico " + content + " inexistente.";
				else
					nombre = valorCanonico.get('VALOR_CANONICO');

			} else if (field == 'PAIS') {

				var sistema = window.manageData.get('DVM_SISTEMA', { ID : rowData.ID_SISTEMA });
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
		configTable.arrayData = job.registros.DVM_VALOR_CANONICO;
		configTable.title = "Valor Canonico";
		configTable.table = "DVM_VALOR_CANONICO";
		configTable.model = manageData.colecciones.DVM_VALOR_CANONICO.model;
		configTable.view = EnvMan.Views.ValorCanonico;
		configTable.viewImport = EnvMan.Views.ValorCanonicoImportar;
		configTable.processCell = function (field, content) {

			var nombre = content;
			if (field == "ID_ENTIDAD_CANONICA"){

				var entidad = window.manageData.get('DVM_ENTIDAD_CANONICA', { ID : content });

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

	mostrarTablaTblResponse:function(e){
		
	},

	guardar : function (e) {

	  if (window.job.job == '')
				delete window.job.job;

		window.job.fecha = window.job.fecha || new Date();
		window.job.proyecto = this.$el.find('#proyecto').val();
		window.job.descripcion = this.$el.find('#descripcion').val();
    if (window.job.proyecto.length > 0) {

      if (window.jobs.where({proyecto : window.job.proyecto }).length > 0 && !window.job.job) {

        var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Proyecto "' + window.job.proyecto + '" existente.'
        });

        $('#modals').append(dialog.el);
        dialog.render();
        dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
        });

      } else {

        window.generales.limpiarRegistros(window.job.registros);
        var jobModel = new EnvMan.Models.Job(window.job);
        jobModel.save();
        window.job = jobModel.toJSON();
        window.jobs.reset();
        window.jobs.fetch();
        this.$el.modal('hide');

      }

    } else {

      var dialog = new EnvMan.Views.DialogBox({
        titulo : "Error",
        texto : 'Campo "Proyecto" obligatorio'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
          backdrop : 'static',
          keyboard : false
      });

    }

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


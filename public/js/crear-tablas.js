function crearTabla(config) {

	var tabla = {};

	var configTable = {};

  configTable.tableName = config.tableName;
	configTable.processCell = config.processCell;
	configTable.headers = config.headers;
	configTable.arrayData = config.arrayData;

	configTable.onAgregar = function (env) {

		var view = new config.view({ model : new config.model() });
		view.render();
		$('#modals').append(view.$el);
		view.$el.modal({
			backdrop : 'static',
			keyboard : false
		});

	};

	configTable.onModificar = function (env) {

		var selected = env.table.getSelectedRows();
		if (selected.length > 0 ) {

      if (selected.length == 1) {

        var index = selected[0];
        var data = env.table.getRowArrayData(index);
        var model = new config.model(data);
        var view = new config.view({ model : model});
        view.render();
        $('#modals').append(view.$el);
        view.$el.modal({
          backdrop : 'static',
          keyboard : false
        });

      } else {

        var dialogo = new EnvMan.Views.DialogBox({
          titulo : 'Importante',
          texto : 'Debe seleccionar solo un elemento a editar'
        });

        $('#modals').append(dialogo.el);
        dialogo.render();
        dialogo.$el.modal({
          backdrop : 'static',
          keyboard : false
        });
    
      }

		}

	}

	configTable.onEliminar = function (env) {

		var selected = env.table.getSelectedRows();
		if (selected.length > 0 ) {

      if (selected.length == 1) {

        var index = selected[0];
        var rowData = env.table.getRowArrayData(index);
        var data = {};
        data.titulo = 'Eliminar ' + config.title;
        data.texto = '¿Desea eliminar el registro seleccionado?';
        data.env = this;

        data.onAceptar = function (env) {

          generales.eliminarRegistroDeJob(config.table, rowData);

        }

        var view = new EnvMan.Views.DialogBox(data);
        view.render();
        $('#modals').append(view.$el);
        view.$el.modal({
          backdrop : 'static',
          keyboard : false
        });

      } else {

        var dialogo = new EnvMan.Views.DialogBox({
          titulo : 'Importante',
          texto : 'Debe seleccionar solo un elemento a Eliminar'
        });

        $('#modals').append(dialogo.el);
        dialogo.render();
        dialogo.$el.modal({
          backdrop : 'static',
          keyboard : false
        });
    
      }

		}

	}

	configTable.onImportar = function (env) {

		var configView = {};
		configView.env = this;
		var self = env;
		configView.onImportar = function (env) {

			var selecteds = env.table.getSelectedRows();
			for (var index in selecteds) {

        var clave = window.generales.obtenerClave(configTabla.tableName, selecteds[index]);
        var registros = window.mangeData.resolverDependencia(configTable.tableName, clave);

        for (var tabla in registros) {

          for (var iTabla in registros[tabla]) {

            var data = registros[tabla][iTabla];
            window.generales.normalizar(tabla, data);

          }

        }
				/*var data= env.table.getRowArrayData(selecteds[index]);
				generales.agregarRegistroAlJob(config.table, data);

				if (data.ID_SISTEMA)
					window.generales.normalizarSistema(data.ID_SISTEMA);

				if (data.ID_ENTIDAD_CANONICA)
					window.generales.normalizarEntidadCanonica(data.ID_ENTIDAD_CANONICA);

				if (data.ID_VALOR_CANONICO)
					window.generales.normalizarValorCanonico(data.ID_VALOR_CANONICO);*/

			}

		}

		var view = new config.viewImport(configView);
		view.render();
		$('#modals').append(view.$el);
		view.$el.modal({
			backdrop : 'static',
			keyboard : false
		});

	};

	tabla = new EnvMan.Views.JobTable(configTable);

	return tabla;
}

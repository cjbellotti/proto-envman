EnvMan.Views.SistemaMRIBS = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {
		this.template = swig.compile( getTemplate('templates/sistema.html'));

	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
                        var ultima = window.manageData.colecciones['DVM_SISTEMA_MRIBS'].last();
			//var ultima = window.collections.sistemas.last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);

			nuevo = true;

		}

		var nombre = this.$el.find('#nombre').val();
		var descripcion = this.$el.find('#descripcion').val();
		var pais = this.$el.find('#pais').val();

    if (nombre.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar un nombre para el sistema'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('NOMBRE', nombre);
      this.model.set('DESCRIPCION', descripcion);
      this.model.set('PAIS', pais);

      if (nuevo) {

        var index = _.findIndex(window.job.registros.sistema, { NOMBRE : nombre, PAIS: pais });

        if (index < 0) {

            window.manageData.colecciones['DVM_SISTEMA_MRIBS'].add(this.model);
            //window.collections.sistemas.add(this.model);
            generales.agregarRegistroAlJob('DVM_SISTEMA_MRIBS', this.model.toJSON());

        }

      } else {

        window.manageData.colecciones['DVM_SISTEMA_MRIBS'].set(this.model, { remove : false });
        //window.collections.sistemas.set(this.model, {remove : false});
        generales.modificarRegistroEnJob('DVM_SISTEMA_MRIBS', this.model.toJSON());

      }

      this.$el.modal('hide');

    }

	},

	render : function () {

		var data = {};
		if (this.model) {

			data = this.model.toJSON();

		}

		this.$el.html(this.template(data));

		this.$el.find('#pais').val(data.PAIS);

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});

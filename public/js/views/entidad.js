EnvMan.Views.Entidad = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile(getTemplate('templates/entidad-screen.html'));
	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
			//var ultima = window.collections.entidades.last();
			var ultima = window.manageData.colecciones['DVM_ENTIDAD_CANONICA'].last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);
			nuevo = true;
		}

		var nombre = this.$el.find('#nombre').val();
		var descripcion = this.$el.find('#descripcion').val();

    if (nombre.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar un nombre para la entidad'
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

      //window.collections.entidades.add(this.model);
      window.manageData.colecciones['DVM_ENTIDAD_CANONICA'].add(this.model);

      if (nuevo) {

        //var index = _.findIndex(window.job.registros.entidadcanonica, { NOMBRE : nombre });
        var index = _.findIndex(window.job.registros['DVM_ENTIDAD_CANONICA'], { NOMBRE : nombre });
        if (index < 0) {	
            //window.collections.entidades.add(this.model);
            window.manageData.colecciones['DVM_ENTIDAD_CANONICA'].add(this.model);
            generales.agregarRegistroAlJob('DVM_ENTIDAD_CANONICA', this.model.toJSON());
        }

      } else {
        //window.collections.entidades.set(this.model, { remove : false });
        window.manageData.colecciones['DVM_ENTIDAD_CANONICA'].set(this.model, { remove : false });
        generales.modificarRegistroEnJob('DVM_ENTIDAD_CANONICA', this.model.toJSON());
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

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	}

});

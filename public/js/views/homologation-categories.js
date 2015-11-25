EnvMan.Views.HomologationCategories = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile(getTemplate('templates/homologation-categories-screen.html'));
	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('CATEGORYID');
		if (!id) {

			var id = 1;
			//var ultima = window.collections.entidades.last();
			var ultima = window.manageData.colecciones['TBL_HOMOLOGATIONCATEGORIES'].last();
			if (ultima) {
				id = ultima.get("CATEGORYID") + 1;
			}

			this.model.set('CATEGORYID', id);
			nuevo = true;
		}

		var nombre = this.$el.find('#nombre').val();
		var canonicalCategoryCode = this.$el.find('#canonical-category-code').val();

    if (nombre.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar un nombre'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('CATEGORYNAME', nombre);
      this.model.set('CANONICALCATEGORYCODE', canonicalCategoryCode);

      //window.collections.entidades.add(this.model);
      window.manageData.colecciones['TBL_HOMOLOGATIONCATEGORIES'].add(this.model);

      if (nuevo) {

        //var index = _.findIndex(window.job.registros.entidadcanonica, { NOMBRE : nombre });
        var index = _.findIndex(window.job.registros['TBL_HOMOLOGATIONCATEGORIES'], { CATEGORYNAME : nombre });
        if (index < 0) {	
            //window.collections.entidades.add(this.model);
            window.manageData.colecciones['TBL_HOMOLOGATIONCATEGORIES'].add(this.model);
            generales.agregarRegistroAlJob('TBL_HOMOLOGATIONCATEGORIES', this.model.toJSON());
        }

      } else {
        //window.collections.entidades.set(this.model, { remove : false });
        window.manageData.colecciones['TBL_HOMOLOGATIONCATEGORIES'].set(this.model, { remove : false });
        generales.modificarRegistroEnJob('TBL_HOMOLOGATIONCATEGORIES', this.model.toJSON());
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

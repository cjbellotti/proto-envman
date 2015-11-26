EnvMan.Views.CacheConfiguration = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile(getTemplate('templates/cache-configuration-screen.html'));
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
			var ultima = window.manageData.colecciones['CACHE_CONFIGURATION'].last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);
			nuevo = true;

		}

		var country = this.$el.find('#country').val();
		var instance = this.$el.find('#instance').val();
    var service = this.$el.find('#service').val();
    var operation = this.$el.find('#operation').val();
    var ttl = this.$el.find('#ttl').val();

    if (country.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar valor para el campo country'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('COUNTRY', country);
      this.model.set('INSTANCE', instance);
      this.model.set('SERVICE', service);
      this.model.set('OPERATION', operation);
      this.model.set('TTL', ttl);

      //window.collections.entidades.add(this.model);
      window.manageData.colecciones['CACHE_CONFIGURATION'].add(this.model);

      if (nuevo) {

        //var index = _.findIndex(window.job.registros.entidadcanonica, { NOMBRE : nombre });
        var index = _.findIndex(window.job.registros['CACHE_CONFIGURATION'], { 
          COUNTRY : country,
          INSTANCE : instance,
          SERVICE : service,
          OPERATION : operation,
          TTL : ttl
        });
        if (index < 0) {	
            //window.collections.entidades.add(this.model);
            window.manageData.colecciones['CACHE_CONFIGURATION'].add(this.model);
            generales.agregarRegistroAlJob('CACHE_CONFIGURATION', this.model.toJSON());
        }

      } else {
        //window.collections.entidades.set(this.model, { remove : false });
        window.manageData.colecciones['CACHE_CONFIGURATION'].set(this.model, { remove : false });
        generales.modificarRegistroEnJob('CACHE_CONFIGURATION', this.model.toJSON());
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

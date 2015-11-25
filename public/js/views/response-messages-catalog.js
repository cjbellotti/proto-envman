EnvMan.Views.ResponseMessagesCatalog = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile(getTemplate('templates/response-message-catalog-screen.html'));
	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID_MESSAGE');
		if (!id) {

			var id = 1;
			//var ultima = window.collections.entidades.last();
			var ultima = window.manageData.colecciones['TBL_RESPONSE_MESSAGES_CATALOG'].last();
			if (ultima) {
				id = ultima.get("ID_MESSAGE") + 1;
			}

			this.model.set('ID_MESSAGE', id);
			nuevo = true;
		}

		var textMessage = this.$el.find('#text-message').val();
		var iso2Code = this.$el.find('#iso2code').val();

    if (textMessage.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar un texto'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('TEXT_MESSAGE', textMessage);
      this.model.set('ISO2CODE', iso2Code);

      //window.collections.entidades.add(this.model);
      window.manageData.colecciones['TBL_RESPONSE_MESSAGES_CATALOG'].add(this.model);

      if (nuevo) {

        //var index = _.findIndex(window.job.registros.entidadcanonica, { NOMBRE : nombre });
        var index = _.findIndex(window.job.registros['TBL_RESPONSE_MESSAGES_CATALOG'], { TEXT_MESSAGE : textMessage, ISO2CODE : iso2Code });
        if (index < 0) {	
            //window.collections.entidades.add(this.model);
            window.manageData.colecciones['TBL_RESPONSE_MESSAGES_CATALOG'].add(this.model);
            generales.agregarRegistroAlJob('TBL_RESPONSE_MESSAGES_CATALOG', this.model.toJSON());
        }

      } else {
        //window.collections.entidades.set(this.model, { remove : false });
        window.manageData.colecciones['TBL_RESPONSE_MESSAGES_CATALOG'].set(this.model, { remove : false });
        generales.modificarRegistroEnJob('TBL_RESPONSE_MESSAGES_CATALOG', this.model.toJSON());
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

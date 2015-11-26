EnvMan.Views.Connections = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile(getTemplate('templates/connections-screen.html'));

	},

	events : {

		"click #aceptar" : "guardar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('COUNTRY_ID');
		if (!id) {

			this.model.set('COUNTRY_ID', this.$el.find('#country-id').val());
			nuevo = true;

		}

		var idSystem = this.$el.find('#id-system').val();
		var urlSystem = this.$el.find('#url-system').val();
    var userId = this.$el.find('#user-id').val();
    var userProof = this.$el.find('#user-proof').val();
    var dsnSystem = this.$el.find('#dsn-system').val();
    var iso2Code = this.$el.find('#iso2code').val();
    var iso3Code = this.$el.find('#iso3code').val();
    var systemVersion = this.$el.find('#system-version').val();

    if (idSystem.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar un ID de sistema'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('ID_SYSTEM', idSystem);
      this.model.set('URL_SYSTEM', urlSystem);
      this.model.set('USER_ID', userId);
      this.model.set('USER_PROOF', userProof);
      this.model.set('DSN_SYSTEM', dsnSystem);
      this.model.set('ISO2CODE', iso2Code);
      this.model.set('ISO3CODE', iso3Code);
      this.model.set('SYSTEM_VERSION', systemVersion);

      //window.collections.entidades.add(this.model);
      window.manageData.colecciones['TBL_CONNECTIONS'].add(this.model);

      if (nuevo) {

        //var index = _.findIndex(window.job.registros.entidadcanonica, { NOMBRE : nombre });
        var index = _.findIndex(window.job.registros['TBL_CONNECTIONS'], { 
          ID_SYSTEM : idSystem,
          URL_SYSTEM : urlSystem,
          USER_ID : userId,
          USER_PROOF : userProof,
          DSN_SYSTEM : dsnSystem,
          ISO2CODE : iso2Code,
          ISO3CODE : iso3Code,
          SYSTEM_VERSION : systemVersion
        });
        if (index < 0) {	
            //window.collections.entidades.add(this.model);
            window.manageData.colecciones['TBL_CONNECTIONS'].add(this.model);
            generales.agregarRegistroAlJob('TBL_CONNECTIONS', this.model.toJSON());
        }

      } else {
        //window.collections.entidades.set(this.model, { remove : false });
        window.manageData.colecciones['TBL_CONNECTIONS'].set(this.model, { remove : false });
        generales.modificarRegistroEnJob('TBL_CONNECTIONS', this.model.toJSON());
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

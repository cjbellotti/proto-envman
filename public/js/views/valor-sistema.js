EnvMan.Views.ValorSistema = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {

		this.template = swig.compile(getTemplate('templates/valor-sistema-screen.html'));
		this.listenTo(window.manageData.colecciones['DVM_SISTEMA'], 'add', this.renderItemComboSistema);
		this.listenTo(window.manageData.colecciones['DVM_ENTIDAD_CANONICA'], 'add', this.renderItemComboEntidad);
		this.listenTo(window.manageData.colecciones['DVM_VALOR_CANONICO'], 'add', this.renderItemComboValorCanonico);

	},

	events : {

		"click #aceptar" : "guardar",
		"click #cancelar" : "cancelar",
		"change #entidad" : "cargarComboValorCanonico",
    "change #pais-sel" : "cargarComboSistema"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('ID');
		if (!id) {

			var id = 1;
			//var ultima = window.collections.valoresSistema.last();
			var ultima = window.manageData.colecciones['DVM_VALOR_SISTEMA'].last();
			if (ultima) {
				id = ultima.get("ID") + 1;
			}

			this.model.set('ID', id);

			nuevo = true;

		}

		var id_sistema = parseInt(this.$el.find('#sistema').val());
		var id_entidad_canonica = parseInt(this.$el.find('#entidad').val());
		var id_valor_canonico = parseInt(this.$el.find('#valor-canonico').val());
		var valor_sistema = this.$el.find('#valor-sistema').val() || "";

    if (valor_sistema.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar un valor.'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('ID_SISTEMA', id_sistema);
      this.model.set('ID_ENTIDAD_CANONICA', id_entidad_canonica);
      this.model.set('ID_VALOR_CANONICO', id_valor_canonico);
      this.model.set('VALOR_SISTEMA', valor_sistema)

      if (nuevo) {

        var index = _.findIndex(window.job.registros['DVM_VALOR_SISTEMA'], { ID_SISTEMA : id_sistema,
                                        ID_ENTIDAD_CANONICA : id_entidad_canonica,
                                        ID_VALOR_CANONICO : id_valor_canonico });

        if (index < 0) {

            //window.collections.valoresSistema.add(this.model);
            window.manageData.colecciones['DVM_VALOR_SISTEMA'].add(this.model);
            //generales.agregarValorSistemaAJob(this.model.toJSON());
            window.generales.agregarRegistroAlJob('DVM_VALOR_SISTEMA', this.model.toJSON());

        }

      } else {
        //window.collections.valoresSistema.set(this.model, {remove : false});
        window.manageData.colecciones['DVM_VALOR_SISTEMA'].set(this.model, {remove : false});
        //generales.modificarValorSistemaEnJob(this.model.toJSON());
        generales.modificarRegistroEnJob('DVM_VALOR_SISTEMA', this.model.toJSON());
      }

      this.$el.modal('hide');

    }

	},

	cancelar : function () {

		
	},

  cargarComboSistema : function (e) {

		this.$el.find('#sistema').html('');
    var pais = this.$el.find('#pais-sel').val();

    var self = this;
		//window.collections.sistemas.each(function (sistema) {
		window.manageData.colecciones['DVM_SISTEMA'].each(function (sistema) {
   
      if (sistema.get('PAIS') == pais)
			  self.renderItemComboSistema(sistema);

		});

  },

	render : function () {

		var data = {};
		if (this.model) {

			data = this.model.toJSON();

		}

		this.$el.html(this.template(data));

		var self = this;
    window.generales.cargarComboPaises(this.$el.find('#pais-sel'), window.job.target, '', function () {

      if (data['ID_SISTEMA']) {

        //var sistema = window.collections.sistemas.get(data['ID_SISTEMA']);
        var sistema = window.manageData.colecciones['DVM_SISTEMA'].get(data['ID_SISTEMA']);
        self.$el.find('#pais-sel').val(sistema.get('PAIS'));
        self.cargarComboSistema();
        self.$el.find('#sistema').val(data['ID_SISTEMA']);

      } else {
        self.cargarComboSistema();
      }

    });

		//window.collections.entidades.each(function (entidad) {
		window.manageData.colecciones['DVM_ENTIDAD_CANONICA'].each(function (entidad) {

			self.renderItemComboEntidad(entidad);

		});


		if (data['ID_ENTIDAD_CANONICA']) {

			this.$el.find('#entidad').val(data['ID_ENTIDAD_CANONICA']);

			if (data['ID_VALOR_CANONICO']) {
			
				this.cargarComboValorCanonico(data['ID_ENTIDAD_CANONICA']);
				this.$el.find('#valor-canonico').val(data['ID_VALOR_CANONICO']);				

			}

		} else {

			var idEntidad = this.$el.find('#entidad').val();

			if (idEntidad > "") {

				this.cargarComboValorCanonico(idEntidad);

			}

		}

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});


	},

	cargarComboValorCanonico : function () {

		var idEntidad = parseInt(this.$el.find('#entidad').val());

		//var valores = window.collections.valoresCanonicos.where({
		var valores = window.manageData.colecciones['DVM_VALOR_CANONICO'].where({

			"ID_ENTIDAD_CANONICA" : idEntidad

		});

		this.$el.find('#valor-canonico').html('');

		var self = this;
		if (valores.length) {

			valores.forEach(function (valorCanonico) {

				self.renderItemComboValorCanonico(valorCanonico);

			});

		}

	},

	renderItemComboSistema : function (sistema) {

		var item = $('<option/>');
		item.attr('value', sistema.get('ID'));
		item.html(sistema.get('NOMBRE') + ' - ' + sistema.get('PAIS'));

		this.$el.find('#sistema').append(item);

	},

	renderItemComboEntidad : function (entidad) {

		var item = $('<option/>');
		item.attr('value', entidad.get('ID'));
		item.html(entidad.get('NOMBRE'));

		this.$el.find('#entidad').append(item);

	},

	renderItemComboValorCanonico : function (valorCanonico) {

		var item = $('<option/>');
		item.attr('value', valorCanonico.get('ID'));
		item.html(valorCanonico.get('VALOR_CANONICO'));

		this.$el.find('#valor-canonico').append(item);

	},

});

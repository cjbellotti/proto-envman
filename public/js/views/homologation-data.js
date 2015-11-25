EnvMan.Views.HomologationData = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1063"
	},

	initialize : function () {
		
		this.template = swig.compile(getTemplate('templates/homologation-data-screen.html'));
		//this.listenTo(window.collections.entidades, 'add', this.renderItemComboEntidad);
		this.listenTo(window.manageData.colecciones['TBL_HOMOLOGATIONCATEGORIES'], 'add', this.renderItemComboHomologationCategories);

	},

	events : {

		"click #aceptar" : "guardar",
		"click #cancelar" : "cancelar"

	},

	guardar: function () {

		var nuevo = false;
		var id = this.model.get('COUNTRYID');
		if (!id) {

			nuevo = true;
                        id = this.$el.find('#country-id').val();
                        this.model.set('COUNTRYID', id);
		}

		var canonicalCode = this.$el.find('#canonical-code').val();
	 	var homologatedConcept = this.$el.find('#homologated-concept').val();
	 	var targetSystemCode = this.$el.find('#target-system-code').val();
		var homologationCategory = parseInt(this.$el.find('#category-id').val());
                var homologatedCode = this.$el.find('#homologated-code').val();

    if (canonicalCode.length == 0) {

      var dialog = new EnvMan.Views.DialogBox({
          titulo : "Error",
          texto : 'Debe especificar el valor para Canonical Code'
      });

      $('#modals').append(dialog.el);
      dialog.render();
      dialog.$el.modal({
            backdrop : 'static',
            keyboard : false
      });

    } else {

      this.model.set('CANONICALCODE', canonicalCode);
      this.model.set('HOMOLOGATEDCONCEPT ', homologatedConcept);
      this.model.set('TARGETSYSTEMCODE', targetSystemCode);
      this.model.set('CATEGORYID', homologationCategory);
      this.model.set('HOMOLOGATEDCODE', homologatedCode);

      if (nuevo) {

        var index = _.findIndex(window.job.registros['TBL_HOMOLOGATIONDATA'], this.model.toJSON()); 

        if (index < 0) {

            //window.collections.valoresCanonicos.add(this.model);
            window.manageData.colecciones['TBL_HOMOLOGATIONDATA'].add(this.model);
            //generales.agregarValorCanonicoAJob(this.model.toJSON());
            generales.agregarRegistroAlJob('TBL_HOMOLOGATIONDATA',this.model.toJSON());

        }

      } else {

        //window.collections.valoresCanonicos.set(this.model, { remove : false});
        window.manageData.colecciones['TBL_HOMOLOGATIONDATA'].set(this.model, { remove : false});
        //generales.modificarValorCanonicoEnJob(this.model.toJSON());
        generales.modificarRegistroEnJob('TBL_HOMOLOGATIONDATA', this.model.toJSON());

      }

      this.$el.modal('hide');

    }

	},

	cancelar : function () {


	},

	render : function () {

		var data = {};
		if (this.model) {

			data = this.model.toJSON();

		}

		this.$el.html(this.template(data));

		var self = this;
		//window.collections.entidades.each(function (entidad) {
                window.manageData.colecciones['TBL_HOMOLOGATIONCATEGORIES'].each(function (registro) {

			self.renderItemComboHomologationCategories(registro);

		});

		if (data['CATEGORYID']) {
			this.$el.find('#category-id').val(data['CATEGORYID']);
		}

		var self = this;
		this.$el.on('hidden.bs.modal', function () {
			self.$el.remove();
		});

	},

	renderItemComboHomologationCategories : function (registro) {

		var item = $('<option/>');
		item.attr('value', registro.get('CATEGORYID'));
		item.html(registro.get('CATEGORYNAME'));

		this.$el.find('#category-id').append(item);

	}

});

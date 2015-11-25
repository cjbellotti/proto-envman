EnvMan.Views.ImportarArchivo = Backbone.View.extend({

	className : "modal fade",
	attributes : {
		"aria-hidden" : "true",
		"style" : "z-index: 1100"
	},

	initialize : function () {
		this.template = swig.compile(getTemplate('templates/importar-window.html'));
	},
	
	events : {

		"click #importarArch" : "importar"
	
	},

	importar : function (e) {

		var self = this;
		 		
		var tablas = {};

		var parseString = function (cadena) { return cadena; };

		var sistema = {};
		sistema.fields = [
			{ID : parseInt},
			{PAIS : parseString},
			{NOMBRE : parseString},
			{DESCRIPCION : parseString}
		];
		sistema.nombre = "DVM_SISTEMA";
		sistema.model = window.manageData.colecciones['DVM_SISTEMA'].model;
		//sistema.collection = window.collections.sistemas;
		sistema.collection = window.manageData.colecciones['DVM_SISTEMA'];
		sistema.agregar = function (registro) {

			window.generales.agregarRegistroAlJob('DVM_SISTEMA', registro);

		};

		tablas['DVM_SISTEMA'] = sistema;

		var entidadcanonica = {};
		entidadcanonica.fields = [

			{ID : parseInt},
			{NOMBRE : parseString},
			{DESCRIPCION : parseString}

		];
		entidadcanonica.nombre = "DVM_ENTIDAD_CANONICA";
		entidadcanonica.model = window.manageData.colecciones['DVM_ENTIDAD_CANONICA'].model; 
		//entidadcanonica.collection = window.collections.entidades;
		entidadcanonica.collection = window.manageData.colecciones['DVM_ENTIDAD_CANONICA'];
		entidadcanonica.agregar = function (registro) {

			window.generales.agregarRegistroAlJob('DVM_ENTIDAD_CANONICA', registro);
			
		};

		tablas['DVM_ENTIDAD_CANONICA'] = entidadcanonica;

		var valorcanonico = {};
		valorcanonico.fields = [

			{ID : parseInt},
			{ID_ENTIDAD_CANONICA : parseInt},
			{DESCRIPCION : parseString},
			{VALOR_CANONICO : parseString}

		];
		valorcanonico.nombre = "DVM_VALOR_CANONICO";
		valorcanonico.model = window.manageData.colecciones['DVM_VALOR_CANONICO'].model;
		//valorcanonico.collection = window.collections.valoresCanonicos;
		valorcanonico.collection = window.manageData.colecciones['DVM_VALOR_CANONICO'];
		valorcanonico.agregar = function (registro) {

			window.generales.agregarRegistroAlJob('DVM_VALOR_CANONICO', registro);
                        window.generales.normalizar('DVM_ENTIDAD_CANONICA', registro.ID_ENTIDAD_CANONICA);

                };

		tablas['DVM_VALOR_CANONICO'] = valorcanonico;

		var valorsistema = {};
		valorsistema.fields = [

			{ID : parseInt},
			{ID_SISTEMA : parseInt},
			{ID_VALOR_CANONICO : parseInt},
			{ID_ENTIDAD_CANONICA : parseInt},
			{VALOR_SISTEMA : parseString}

		];
		valorsistema.nombre = "DVM_VALOR_SISTEMA";
		valorsistema.model = window.manageData.colecciones['DVM_VALOR_SISTEMA'].model;
		//valorsistema.collection = window.collections.valoresSistema;
		valorsistema.collection = window.manageData.colecciones['DVM_VALOR_SISTEMA'];
		valorsistema.agregar = function (registro) {

			window.generales.agregarRegistroAlJob('DVM_VALOR_SISTEMA', registro);
                        window.generales.normalizar('DVM_SISTEMA', registro.ID_SISTEMA);
                        window.generales.normalizar('DVM_ENTIDAD_CANONICA', registro.ID_ENTIDAD_CANONICA);
                        window.generales.normalizar('DVM_VALOR_CANONICO', registro.ID_VALOR_CANONICO);

                };

		tablas['DVM_VALOR_SISTEMA'] = valorsistema;

		var reader = new FileReader();
		reader.onload = function(e) {
			var rows=e.target.result.split("\n");

			var data = expandImport(e.target.result);

			for (var tabla in data) {

				for (var index in data[tabla]) {

					tablas[tabla].agregar(data[tabla][index]);
					var model = new tablas[tabla].model(data[tabla][index]);
					tablas[tabla].collection.set(model, { remove : false });

				}
				
			}

		}
		reader.readAsText($('#archivo:file')[0].files[0]);
		return false;
	},
	
	render : function () {

		this.$el.html(this.template);
		$(document).on('change', '.btn-file :file', function() {
  			var input = $(this),
      		numFiles = input.get(0).files ? input.get(0).files.length : 1,
      		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  			input.trigger('fileselect', [numFiles, label]);
		});


    	$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        	var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        	if( input.length ) {
           		input.val(log);
        	} else {
            	if( log ) alert(log);
        	}
        
   		 });
	}

});

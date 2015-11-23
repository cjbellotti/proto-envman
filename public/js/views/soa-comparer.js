EnvMan.Views.SOAComparer = Backbone.View.extend({
	
	initialize : function(){
		this.template = swig.compile(getTemplate('templates/soa-screen.html'));
	},
	
	render:function(){
		//var dataSoa = {} ;
		$.ajax({
			url : '/soa-comparer',
			method : 'GET',
			async : false,
			contentType : 'application/json',
			success : function (data) { 
				console.log('consulta exitosa servicio -> /soa-comparer');
				//dataSoa.registros = data; 
				var artefactos = [];
				var valores = [];
				var object = 
				for(var index in objeto){
					artefactos.push(objeto[index].artefacto);
					var data = {};
					data.version = objeto[index].version;
					data.fecha = objeto[index].fechaDespliegue;
					valores.push(data);
				}	
			}
		});
		this.$el.html(this.template(/*dataSoa*/));
	},

	events : {
		"click #aceptar" : "save",
		"click #cancelar" : "cancel"
	},
	
	save: function(e){
		console.log('evento guardar...');
	},
	cancel:function(e){
		console.log('evento cancelar...');
	}

});
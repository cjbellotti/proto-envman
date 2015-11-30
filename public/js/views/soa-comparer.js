EnvMan.Views.SOAComparer = Backbone.View.extend({
	
	initialize : function(){
		this.template = swig.compile(getTemplate('templates/soa-screen.html'));
	},
	
	render:function(){
		var artefactos = {};
		$.ajax({
			url : '/soa-comparer',
			method : 'GET',
			async : false,
			contentType : 'application/json',
			success : function (data) { 
				console.log('consulta exitosa servicio -> /soa-comparer');
				for(var ambiente in data){
					for(var index in data[ambiente]){
						var artefacto = data[ambiente][index].artefacto ;
						if(!artefactos[artefacto]){
							artefactos[artefacto] = {};
							artefactos[artefacto].particion = data[ambiente][index].particion;
							artefactos[artefacto].ambientes = {} ;
							for(var index in window.ambientes){
								artefactos[artefacto].ambientes[window.ambientes[index]] = {};
							}
						}
						artefactos[artefacto].ambientes[ambiente] = {
							version : data[ambiente][index].version,
							fecha: data[ambiente][index].fechaDespliegue
						};
					}
				}
				console.log(JSON.stringify(artefactos));
			}
		});
		this.$el.html(this.template({
			artefactos : artefactos
		}));
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
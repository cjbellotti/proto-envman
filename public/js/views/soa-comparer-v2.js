EnvMan.Views.SOAComparer = Backbone.View.extend({
	
	initialize : function(){
		this.template = swig.compile(getTemplate('templates/soa-screen-v2.html'));
    this.artefactos = {};
    this.arrayArtefactos = [];
    var self = this;
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
						if(!self.artefactos[artefacto]){
							self.artefactos[artefacto] = {};
							self.artefactos[artefacto].particion = data[ambiente][index].particion;
							self.artefactos[artefacto].ambientes = {} ;
							for(var index2 in window.ambientes){
								self.artefactos[artefacto].ambientes[window.ambientes[index2]] = {};
							}
						}
						self.artefactos[artefacto].ambientes[ambiente] = {
							version : data[ambiente][index].version,
							fecha: data[ambiente][index].fechaDespliegue,
							diff: data[ambiente][index].diff 
						};
					}
				}

        self.ordenarArtefactos('artefacto');

			}
		});
	},

	events : {
		"click #aceptar" : "save",
		"click #cancelar" : "cancel",
    "click .table-soa-sortable" : "ordenar"
	},

  ordenar : function (e) {

    var campo = $(e.target).attr('sort-field');

    this.ordenarArtefactos(campo);
    this.render();
  },

  ordenarArtefactos : function (campo) {
    this.arrayArtefactos = [];
    for (var artefacto in this.artefactos) {
      
      var item = {};
      item.artefacto = artefacto;
      item.particion = this.artefactos[artefacto].particion;
      
      item.ambientes = this.artefactos[artefacto].ambientes;

      var diff = false;
      var version = "";
      for (var ambiente in item.ambientes) {
        if (version == "")
          version = item.ambientes[ambiente].version;
        else
          if (version != item.ambientes[ambiente].version)
            diff = true;
      }

      for (var ambiente in item.ambientes) {
        item.ambientes[ambiente].diff = diff;
      }

      this.arrayArtefactos.push(item);

    }
    this.arrayArtefactos.sort(function (a, b) {

      return (a[campo] < b[campo]) ? -1 : (a[campo] > b[campo]) ? 1 : 0;

    });
  },

	render:function(){
		this.$el.html(this.template({
			artefactos : this.arrayArtefactos 
		}));
	},

	
	save: function(e){
		console.log('evento guardar...');
	},
	cancel:function(e){
		console.log('evento cancelar...');
	}

});

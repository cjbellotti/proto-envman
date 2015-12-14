EnvMan.Views.SOAComparer = Backbone.View.extend({
	
	initialize : function(){
		this.template = swig.compile(getTemplate('templates/soa-screen-v2.html'));
	    this.artefactos = {};
	    this.arrayArtefactos = [];
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

  ajaxGetSoa:function(callback){
  	var self = this;
	$.ajax({
		url : '/soa-comparer',
		method : 'GET',
		async : false,
		contentType : 'application/json',
		success : function (data) { 
       		self.artefactos = data;
       		self.ordenarArtefactos('artefacto');
       		callback();
		}
	});
  },

  ajaxPostSoa: function(ambientes,callback){
  	var self = this;
  	$.ajax({
		url : '/soa-comparer', 
	    method : 'POST',
	    contentType : 'application/json',
	    data : JSON.stringify(ambientes),
	    success: function (data) {
	     	self.artefactos = data;
	     	self.ordenarArtefactos('artefacto');
	     	callback();
		}
	});
  },

  render:function(){
  	var self = this;

	//var obj = {};
	//obj.ambientes = ['DESA','IST'];

	/*this.ajaxPostSoa(obj,function(){
  		self.$el.html(self.template({
			artefactos : self.arrayArtefactos 
		}));
  	});*/

  	this.ajaxGetSoa(function(){
  		self.$el.html(self.template({
			artefactos : self.arrayArtefactos 
		}));
  	});

  },

  save: function(e){
	console.log('evento guardar...');
  },

  cancel:function(e){
	console.log('evento cancelar...');
  }

});

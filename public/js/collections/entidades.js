EnvMan.Collections.Entidades = Backbone.Collection.extend({

	model : EnvMan.Models.Entidad,

	fetchData : function (objeto) {
		this.url = "/DVM_ENTIDAD_CANONICA/" + window.job.target;
		this.fetch(objeto);
	},

  fetchAmb : function (amb, objeto) {
		this.url = "/DVM_ENTIDAD_CANONICA/" + amb;
		this.fetch(objeto);
  }

});

EnvMan.Collections.Sistemas = Backbone.Collection.extend({

	model : EnvMan.Models.Sistema,

	fetchData : function (objeto) {
		this.url = "/DVM_SISTEMA/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/DVM_SISTEMA/" + amb;
		this.fetch(objeto);
	},

});

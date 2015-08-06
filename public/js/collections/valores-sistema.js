EnvMan.Collections.ValoresSistema = Backbone.Collection.extend({

	model : EnvMan.Models.ValorSistema,

	fetchData : function (objeto) {
		this.url = "/valor-sistema/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/valor-sistema/" + amb;
		this.fetch(objeto);
	}

});

EnvMan.Collections.ValoresCanonicos = Backbone.Collection.extend({

	model : EnvMan.Models.ValorCanonico,

	fetchData : function (objeto) {
		this.url = "/DVM_VALOR_CANONICO/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/DVM_VALOR_CANONICO/" + amb;
		this.fetch(objeto);
	}

});

EnvMan.Collections.ValoresSistema = Backbone.Collection.extend({

	model : EnvMan.Models.ValorSistema,

	fetchData : function (objeto) {
		this.url = "/DVM_VALOR_SISTEMA/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/DVM_VALOR_SISTEMA/" + amb;
		this.fetch(objeto);
	}

});

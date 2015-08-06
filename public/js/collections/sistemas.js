EnvMan.Collections.Sistemas = Backbone.Collection.extend({

	model : EnvMan.Models.Sistema,

	fetchData : function (objeto) {
		this.url = "/sistema/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/sistema/" + amb;
		this.fetch(objeto);
	},

});

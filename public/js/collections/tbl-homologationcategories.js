EnvMan.Collections.TblHomologationCategories = Backbone.Collection.extend({

	model : EnvMan.Models.TblHomologationCategories,

	fetchData : function (objeto) {
		this.url = "/TBL_HOMOLOGATIONCATEGORIES/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/TBL_HOMOLOGATIONCATEGORIES/" + amb;
		this.fetch(objeto);
	}

});

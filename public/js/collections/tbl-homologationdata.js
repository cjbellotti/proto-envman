EnvMan.Collections.TblHomologationData = Backbone.Collection.extend({

	model : EnvMan.Models.TblHomologationData,

	fetchData : function (objeto) {
		this.url = "/TBL_HOMOLOGATIONDATA/" + window.job.target;
		this.fetch(objeto);
	},

	fetchAmb : function (amb, objeto) {
		this.url = "/TBL_HOMOLOGATIONDATA/" + amb;
		this.fetch(objeto);
	}

});

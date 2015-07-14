EnvMan.Views.LandingPage = Backbone.View.extend({

  attributes : {
    "style" : "height : 100%"
  },

	initialize : function () {

		this.template = swig.compile( $('#landing-page-template').html());
    this.applicationTemplate = swig.compile( $('#application-template').html());
    this.newsTemplate = swig.compile( $('#news-template').html() );

	},

	render : function () {

		this.$el.html(this.template());

	}

});

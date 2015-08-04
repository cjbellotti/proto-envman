EnvMan.Views.DBComparer = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/db-comparer.html'));

  },

  events : {
  },

  render : function () {

    this.$el.html(this.template());

  }

});

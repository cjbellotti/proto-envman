EnvMan.Views.EnvComparer = Backbone.View.extend({

  initialize : function () {

    this.template = swig.compile(getTemplate('templates/env-comparer.html'));

  },

  events : {

    "change #ambiente1" : "cargarAmbiente",
    "change #ambiente2" : "cargarAmbiente",

  },

  cargarAmbiente : function () {


  },

  render : function () {

    this.$el.html(this.template());

  }

});

EnvMan.Router = Backbone.Router.extend({

  routes : {

    '' : 'landing',
    'envman' : 'envman'

  },

  landing : function () {

      var view = new EnvMan.Views.LandingPage();
      $('#main').html(view.el);
      view.render();

  },

  envman : function () {

      var view = new EnvMan.Views.ListaJobs();
      $('#main').html(view.el);
      view.render();

  }

});


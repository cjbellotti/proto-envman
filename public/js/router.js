EnvMan.Router = Backbone.Router.extend({

  routes : {

    '' : 'landing',
    'envman' : 'envman',
    'dbexplorer' : 'dbExplorer'

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

  },

  dbExplorer : function () {

      var view = new EnvMan.Views.DBExplorer();
      $('#main').html(view.el);
      view.render();

  }

});


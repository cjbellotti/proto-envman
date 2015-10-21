EnvMan.Router = Backbone.Router.extend({

  routes : {

    '' : 'landing',
    'envman' : 'envman',
    'dbexplorer' : 'dbExplorer',
    'dbcomparer' : 'dbComparer',
    'envcomparer' : 'envComparer'

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

      window.job.target = ambientes[0];

      window.collections.sistemas.fetchData({ async : false });
      window.collections.entidades.fetchData({ async : false });
      window.collections.valoresCanonicos.fetchData({ async : false });

      var view = new EnvMan.Views.DBExplorer();
      $('#main').html(view.el);
      view.render();

  },

  dbComparer : function () {

      var view = new EnvMan.Views.DBComparer();
      $('#main').html(view.el);
      view.render();

  },

  envComparer : function () {

      var view = new EnvMan.Views.EnvComparer();
      $('#main').html(view.el);
      view.render();

  }
});


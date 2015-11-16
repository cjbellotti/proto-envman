EnvMan.Router = Backbone.Router.extend({

  routes : {

    '' : 'landing',
    'envman' : 'envman',
    'dbexplorer' : 'dbExplorer',
    'dbcomparer' : 'dbComparer',
    'envcomparer' : 'envComparer'

  },

  landing : function () {

      $.get('/get-aplicaciones', function (data) {

        var datos = {};
        datos.grupos = data;

        $.get('/get-novedades', function (data) {

          datos.novedades = data;
          var view = new EnvMan.Views.Landing(datos);
          $('#main').html(view.el);
          view.render();

        });

      });

  },

  envman : function () {

      var view = new EnvMan.Views.ListaJobs();
      $('#main').html(view.el);
      view.render();

  },

  dbExplorer : function () {

      window.job.target = ambientes[0];

      window.manageData.fetch({

        success : function () {
          var view = new EnvMan.Views.DBExplorer();
          $('#main').html(view.el);
          view.render();
        }

      });

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


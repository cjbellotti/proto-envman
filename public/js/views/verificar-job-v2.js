EnvMan.Views.VerificarJob = Backbone.View.extend({

  className : "modal fade",
  attributes : {
    "aria-hidden" : "true",
    "style" : "z-index: 1200"
  },

  initialize : function (config) {

    this.template = swig.compile( getTemplate('templates/verificar.html'));
    this.tableTemplate = swig.compile ( getTemplate('templates/verif-table.html') );
    this.contentTemplate = swig.compile ( getTemplate('templates/verif-table-content.html') );
    this.dataTemplate = swig.compile ( getTemplate('templates/verif-table-data.html') );

  },

  events : {

    "click #exportar" : "exportar"

  },

  exportar : function (e) {

    e.preventDefault();
    $.ajax({
      url : '/generar-script',
      method : 'POST',
      contentType : 'application/json',
      data : JSON.stringify({
        target : window.job.target,
        registros : this.datos
      }),
      success : function (data) {
        console.log(data);

        var view = new EnvMan.Views.VerScript(data);
        $('#modals').append(view.el);
        view.render();
        view.$el.modal({
          backdrop : 'static',
          keyboard : false
        });
      }

    });

  },

  render : function () {

    // Solo cargo en la tabla los sistemas que NO se encuentren en el Job.

    var self = this;

    var espera = new EnvMan.Views.Espera({

      onclose : function () {

        self.$el.html(self.template());
        self.$el.find('.table-content').append(self.tableTemplate(self.datos));
        self.$el.find('.vb-container').html( self.contentTemplate(self.datos));
                

        self.$el.on('hidden.bs.modal', function () {
          self.$el.remove();
        });

      }
    });

    espera.render();
    $('#modals').append(espera.el);
    espera.show();

    window.generales.limpiarRegistros(window.job.registros);
    $.ajax({
      method : 'POST',
      url : '/verificar', 
      contentType : 'application/json',
      data : JSON.stringify(window.job),
      success: function (data) {

        self.datos = {};
        self.datos.datos = self.formatearDatos(data);

        //$('.vb-data').html(self.contentTemplate(self.datos));

        espera.hide();

      }

    });


  },

  formatearDatos : function (data) {

    var datos = {};

    for (var dc in data) {

      datos[dc] = {};

      for (var tabla in data[dc]) {

        for (var index in data[dc][tabla]) {

          var registro = data[dc][tabla][index];

          if(registro.MOD){

            if (!datos[dc].update)
              datos[dc].update = [];
            window.generales.limpiarRegistro(registro);
            datos[dc].update.push(registro);
            
          } else {

            if (!datos[dc].insert)
              datos[dc].insert = [];
            window.generales.limpiarRegistro(registro);
            datos[dc].insert.push(registro);

          }

        }

      }

    }

    return datos;

  }

});

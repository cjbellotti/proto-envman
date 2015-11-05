function CrearManageTablas(definiciones) {

  var manager = {};

  manager.colecciones = {};
  
  for (var tabla in definiciones) {

    var def = definiciones[tabla];
    var url = '/' + def.alias;
    var model = Backbone.Model.extend({

      baseURL : url,
      table : tabla,
      url : function () {

        var url = this.baseURL + '/' + window.job.target;
        for ( var campo in window.defTablas[this.tabla].claves ) {

          var valor = this.get(campo);
          if (valor)
            url += '/' + valor;

        }
        return url;

      }
      
    });
    manager.colecciones[tabla] = new EnvMan.Collections.GenericCollection(url, model);

  }

  // A partir de la tabla y datos para la clave obtiene todos los registros vinculados
  manager.resolverDependencias = function (tabla, clave) {

    var registros = {};

    // Obtengo definicion de tabla
    var defTabla = window.defTablas[tabla];

    // Obtengo registros
    var resQuery = manager.colecciones[tabla].where(clave);

    // Recorro los registro 
    for (var index in resQuery) {

      if (!registros[tabla])
        registros[tabla] = [];

      // Agrego el registro a la respuesta
      var registro = resQuery[index].toJSON();
      if (_.findIndex(registros[tabla], registro) < 0)
        registros[tabla].push(registro);

      // Recorro los campos del registro buscando si hay dependencia con otra tabla
      for (var field in registro) {

        // Si el campo es una referencia a otra tabla ejecuto la recursividad
        if (defTabla.campos[field])
          if (defTabla.campos[field].ref) {

            var refClave = {};

            // Nombre de la tabla referida
            var refTabla = defTabla.campos[field].ref;

            // Cargo refClave con los campos necesarios para buscar el registro requerido
            var fieldClave = _.keys(window.defTablas[refTabla].claves)[0];
            refClave[fieldClave] = registro[field];

            // Ejecuto recursividad y obtengo un objetos con los registros necesarios
            var refRegistros = manager.resolverDependencias(refTabla, refClave);

            // Recorro la respuesta para agregar los registros a la respuesta.
            for (var rTabla in refRegistros) {

              for (var rIndex in refRegistros[rTabla]) {

                if (!registros[rTabla])
                  registros[rTabla] = [];

                if (_.findIndex(registros[rTabla], refRegistros[rTabla][index]) < 0) 
                  registros[rTabla].push(refRegistros[rTabla][index]);

              }

            }

          }

      }

    }

    return registros;

  }

  return manager;

}

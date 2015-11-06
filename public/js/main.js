
Date.prototype.getYYYYMMDD = function () { return this.toISOString().replace(/(.*?)\-(.*?)\-(.*?)T.*/g,"$1-$2-$3"); }

window.jobs = new EnvMan.Collections.Jobs();
/*window.collections.sistemas = new EnvMan.Collections.Sistemas();
window.collections.sistemas.comparator = "ID";
window.collections.entidades = new EnvMan.Collections.Entidades();
window.collections.entidades.comparator = "ID";
window.collections.valoresCanonicos = new EnvMan.Collections.ValoresCanonicos();
window.collections.valoresCanonicos.comparator = "ID";
window.collections.valoresSistema = new EnvMan.Collections.ValoresSistema();
window.collections.valoresSistema.comparator = "ID";*/
window.ambientes = [];

window.Fases = [
	"DESA",
	"IST",
	"UATP",
	"ISTM",
	"QAM",
	"PROD"
];

// Obtiene los datos correspondiente a la clave del registro pasado por parametro
window.generales.obtenerClave = function (tabla, registro) {

  var clave = {};
  for (var field in window.defTablas[tabla].claves)
    clave[field] = registro[field];

  return clave;

}

// Agrega un registro al job activo
window.generales.agregarRegistroAlJob = function(tabla, registro) {

	var ret =  true;
	if (!window.job.registros[tabla]) {
		window.job.registros[tabla] = [];
	}

  var clave = window.generales.obtenerClave(tabla, registro);
	var index = _.findIndex(job.registros[tabla], clave);

	if (index >= 0) {

    // obtiene el ultimo registro de la tabla
		var ultimo = _.last(job.registros[tabla]);
    for (var field in window.defTablas[tabla].claves) {

      // Si el campo correspondiente a la clave es numerico, se incrementa y asigna al
      // nuevo registro
      if (window.defTablas[tabla].claves[field] == '9')
		    registro[field] = ultimo[field] + 1;

    }

	}

	window.job.registros[tabla].push (registro);

	return ret;

}

// Modificar registros en el Job
window.generales.modificarRegistroEnJob = function(tabla, registro) {

	var ret = false;
	if (!window.job.registros[tabla]) {
		window.job.registros[tabla] = [];
	}

  var clave = window.generales.obtenerClave(tabla, registro);
	var index = _.findIndex(job.registros[tabla], clave);

	if (index >= 0) {
		window.job.registros[tabla][index] = registro;
		ret = true;
	}

	return ret;

}

// Elimina un registro del Job
window.generales.eliminarRegistroDeJob = function(tabla, registro) {

	var ret = false;
	if (window.job.registros[tabla]) {

    var clave = window.generales.obtenerClave(tabla, registro);
		var index = _.findIndex(job.registros[tabla], clave);

		if (index >= 0) {
			job.registros[tabla].splice(index,1);
			ret = true;
		}

	}

	return ret;

}

// Obtener un registro del Job
window.generales.obtenerRegistroDeJob = function(tabla, clave) {

	var ret = null;
	if (window.job.registros[tabla]) {

		var index = _.findIndex(job.registros[tabla], clave);

		if (index >= 0)
			ret = window.job.registros[tabla][index];

	}

	return ret;

}

// Normalizar registro - dada una clave obtiene el registro de las colecciones
// y la agrega al Job activo si es que no existia previamente.
window.generales.normalizar = function (tabla, clave) {

  var registro = window.generales.obtenerRegistroDeJob(tabla, clave);

  if (registro == null) {

    var modelo = window.manageData.colecciones[tabla].get(clave);
    if (modelo) {

      var data = modelo.toJSON();
			window.generales.agregarRegistroAlJob(tabla, data);

    }

  }

}

// Dado un registro, obtiene las dependencias del mismo y agrega todo al Job
window.generales.importarRegistroAJob = function (tabla, claves) {

  var registros = window.manageData.resolverDependencias(tabla, claves);
  
  for (var tabla in registros) {

    for (var index in registros[tabla]) {

      var registro = registros[tabla][index];
      if (_.findIndex(window.job.registros[tabla], registro) < 0)
        window.job.registros[tabla].push(registro);

    }

  }

}

/*window.generales.agregarValorCanonicoAJob = function(registro) {

	window.generales.agregarRegistroAlJob("valorcanonico", registro);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

}

window.generales.modificarValorCanonicoEnJob = function(registro) {

	window.generales.modificarRegistroEnJob("valorcanonico", registro);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

}

window.generales.agregarValorSistemaAJob = function(registro) {

	window.generales.agregarRegistroAlJob("valorsistema", registro);

	window.generales.normalizarSistema(registro['ID_SISTEMA']);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

	window.generales.normalizarValorCanonico(registro['ID_VALOR_CANONICO']);

}

window.generales.modificarValorSistemaEnJob = function(registro) {

	window.generales.modificarRegistroEnJob("valorsistema", registro);

	window.generales.normalizarSistema(registro['ID_SISTEMA']);

	window.generales.normalizarEntidadCanonica(registro['ID_ENTIDAD_CANONICA']);

	window.generales.normalizarValorCanonico(registro['ID_VALOR_CANONICO']);

}*/

/*window.generales.crearTablas = function(tablas) {

	tablas = {};

	tablas.sistema = [];
	tablas.entidad = [];
	tablas.valorcanonico =[];
	tablas.valorsistema = [];	
}*/

window.generales.crearNuevoJob = function () {

	window.job = {

		job : "",
		target : "DESA",
		proyecto : "",
		descripcion : "",
		registros : {}

	};

  for (var tabla in window.defTablas) {
    window.job.registros[tabla] = [];
  }

}

window.generales.cargarColecciones = function () {

	for (var tabla in window.job.registros) {

		for (var index in window.job.registros[tabla]) {

			var registro = window.job.registros[tabla][index];
			var query = {};
			for (var field in registro) {

				if (field != 'ID' && field != 'DESCRIPCION')
					query[field] = registro[field];

			}

			var model = null;
			switch (tabla) {

				case "sistema":

					model = window.collections.sistemas.where(query);
					if (model != null && model.length > 0) {
						if (model[0].get('DESCRIPCION') != registro.DESCRIPCION)
							window.collections.sistemas.set(new EnvMan.Models.Sistema(registro), { remove : false });
					} else {
						window.collections.sistemas.add(new EnvMan.Models.Sistema(registro));
					}
					break;

				case "entidadcanonica":

					model = window.collections.entidades.where(query);
					if (model != null && model.length > 0) {
						if (model[0].get('DESCRIPCION') != registro.DESCRIPCION)
							window.collections.entidades.set(new EnvMan.Models.Entidad(registro), { remove : false});
					} else {
						window.collections.entidades.add(new EnvMan.Models.Entidad(registro));
					}
					break;

				case "valorcanonico":

					model = window.collections.valoresCanonicos.where(query);
					if (model != null && model.length > 0) {
						if (model[0].get('DESCRIPCION') != registro.DESCRIPCION)
							window.collections.valoresCanonicos.set(new EnvMan.Models.ValorCanonico(registro), { remove : false});
					} else {
						window.collections.valoresCanonicos.add(new EnvMan.Models.ValorCanonico(registro));
					}
					break;

				case "valorsistema":

					model = window.collections.valoresSistema.where(query);
					if (model != null && model.length > 0) {
						window.collections.valoresSistema.set(new EnvMan.Models.ValorCanonico(registro), { remove : false});
					} else {
						window.collections.valoresSistema.add(new EnvMan.Models.ValorCanonico(registro));
					}
					break;

			}

		}

	}

}

window.generales.limpiarRegistros = function (registros) {

	for (var tabla in registros) {

		for (var index in registros[tabla]) {

      window.generales.limpiarRegistro(registros[tabla][index]);

		}

	}

}

window.generales.limpiarRegistro = function (registro) {

  if (!_.isUndefined(registro.IDN))
    delete registro.IDN;

  if (!_.isUndefined(registro.MOD))
    delete registro.MOD;

  if (!_.isUndefined(registro.origenReg))
    delete registro.origenReg;
}

/*window.generales.normalizarNombreTabla = function (nombreTabla) {

	var nombreTablaNormalizado = '';
	switch (nombreTabla) {
		case 'sistema':

			nombreTablaNormalizado = 'DVM_SISTEMA';
			break;

		case 'entidadcanonica':

			nombreTablaNormalizado = 'DVM_ENTIDAD_CANONICA';
			break;

		case 'valorcanonico':

			nombreTablaNormalizado = 'DVM_VALOR_CANONICO';
			break;

		case 'valorsistema':

			nombreTablaNormalizado = 'DVM_VALOR_SISTEMA';
			break;

		default:

			nombreTablaNormalizado = null;
			break;

	}

	return nombreTablaNormalizado;
	
};*/

// url: Debe empezar y terminar con '/'
window.generales.obtenerDatos = function (Coleccion, url) {

	var coleccion = new Coleccion();

	coleccion.url = url;

	coleccion.fetch({ async : false });
	
	return coleccion.toJSON();

}

window.generales.datos = {};

window.generales.datos.sistemas = function (ambiente) {

		return window.generales.obtenerDatos(EnvMan.Collections.Sistemas, '/sistema/' + ambiente);

}

window.generales.datos.entidades = function (ambiente) {

		return window.generales.obtenerDatos(EnvMan.Collections.Entidades, '/entidad-canonica/' + ambiente);

}

window.generales.datos.valoresCanonicos = function (ambiente) {

		return window.generales.obtenerDatos(EnvMan.Collections.ValoresCanonicos, '/valor-canonico/' + ambiente);

}

window.generales.datos.valoresSistema = function (ambiente) {

		return window.generales.obtenerDatos(EnvMan.Collections.ValoresSistema, '/valor-sistema/' + ambiente);

}

window.generales.cargarComboAmbientes = function (elemento) {

	elemento.html('');

	for (var index in window.ambientes){

			var option = $('<option/>');
			option.attr('value', window.ambientes[index]);
			option.html(ambientes[index]);
			elemento.append(option);

	}
}

window.generales.cargarComboTablas = function (elemento) {
	elemento.html('');

	for (var tabla in window.defTablas){

			var option = $('<option/>');
			option.attr('value', tabla);
			option.html(tabla);
			elemento.append(option);

	}
}

window.generales.cargarComboPaises = function (elemento, ambiente, modalidad, callback) {

	elemento.html('');

	if (modalidad == '*')
		elemento.append('<option value="*">Todas</option>');

  $.get('/paises/' + ambiente, function (data) {

    for (var index in data) {

			var option = $('<option/>');
			option.attr('value', data[index].PAIS);
			option.html(data[index].PAIS);
			elemento.append(option);

    }

    if (callback)
      callback(data);

  });

}

window.generales.cargarComboSistemas = function (elemento, ambiente, modalidad, pais) {

	elemento.html('');

	if (modalidad == '*')
		elemento.append('<option value="*">Todas</option>');

	var sistemas = window.generales.datos.sistemas(ambiente);
	for (var index in sistemas){

      if (!pais || pais == '*' || sistemas[index].PAIS == pais) {
        var option = $('<option/>');
        option.attr('value', sistemas[index].ID);
        option.html(sistemas[index].NOMBRE + ' - ' + sistemas[index].PAIS);
        elemento.append(option);
      }

	}

}

window.generales.cargarComboEntidades = function (elemento, ambiente, modalidad) {

	elemento.html('');

	if (modalidad == '*')
		elemento.append('<option value="*">Todas</option>');

	var entidades = window.generales.datos.entidades(ambiente);
	for (var index in entidades){

			var option = $('<option/>');
			option.attr('value', entidades[index].ID);
			option.html(entidades[index].NOMBRE);
			elemento.append(option);

	}

}

window.compararArrays = function (claves, comparar, datos1, datos2) {

  var faltantes = [];

  for (var index in datos1) {

    for (var field in claves) {
  
      claves[field] = datos1[index][field];

    }

    var index2 = _.findIndex(datos2, claves);

    if (index2 >= 0) {

      var igual = true;
      for (var field in comparar) {

        if (igual) {

          if (!datos1[index][field])
            console.log (datos1[index]);
          else if (!datos2[index])
            console.log(datos2[index]);
          else
            igual = (datos1[index][field] == datos2[index][field]);

        }

      }

      if (!igual) 
        datos1[index].diff = true;

    } else {
      
      faltantes.push(datos1[index]);

    }

  }

  return faltantes;

}

window.compararTablas = function(tabla, datos1, datos2) {

  var claves = {};
  var comparar = {};

  var faltantes1 = [];
  var faltantes2 = [];

  for (var field in window.defTablas[tabla].campos) {

    if (window.defTablas[tabla].campos[field].tipo == 'K')
      claves[field] = "";
    else
      comparar[field] = "";

  }

  faltantes2 = window.compararArrays(claves, comparar, datos1, datos2);
  faltantes1 = window.compararArrays(claves, comparar, datos2, datos1);

  for (var index in faltantes1) {

    var datos = _.clone(faltantes1[index]);
    datos.new = true;

    datos1.push(datos);

  }
  
  for (var index in faltantes2) {

    var datos = _.clone(faltantes2[index]);
    datos.new = true;

    datos2.push(datos);

  }

}

$(function() {
		
		$.ajax({

				url : '/ambientes',
				method : 'GET',
				async : false,
				success : function (data) {

					window.ambientes = data;

				}

		});


		$.ajax({

				url : '/config',
				method : 'GET',
				async : false,
				success : function (data) {

					window.config = data;

				}

		});

		$.ajax({

				url : '/def-tablas',
				method : 'GET',
				async : false,
				success : function (data) {

          console.log('inicializacion');
					window.defTablas = data;
          window.manageData = CrearManageTablas(window.defTablas);
          window.manageData.fetch({ async : false });

				}

		});

    window.router = new EnvMan.Router();
    Backbone.history.start();

})

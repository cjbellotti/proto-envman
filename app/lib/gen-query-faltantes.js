var defTablas = require('../tables-definition');

function generarQuerySelect (tabla, sufix) {
  
  var result = {
    fields : [],
    comparables : [],
    diferenciables : []
  };
  var query = '';
  var fields = [];
  if (!sufix)
    sufix = '';
  var tableName = tabla + ((sufix.length > 0) ? '_' + sufix : '');
  var source = tableName;


  for (var field in defTablas[tabla].campos) {

    var campo = defTablas[tabla].campos[field];
    var campoTmp = ((campo.ref) ? campo.ref + '_' + sufix: tableName) + '.' + ((campo.ref) ? defTablas[campo.ref].campoInfo : field) + ' AS FIELD_' + field;
    result.fields.push(field + ' AS ' + field);
    if (campo.comprobar)
      result.comparables.push(field);
    else
      if (!campo.saltear)
        result.diferenciables.push(field);

    fields.push(campoTmp);
    fields.push(tableName + '.' + field + ' AS ' + field);
    if (campo.ref) {
      source += ' LEFT JOIN ' + campo.ref + '_' + sufix +' ON ' + tableName + '.' + field + ' = ' + campo.ref + '_' + sufix + '.' + campo.camposRef[0]; 
    }

  }

  result.query = 'SELECT ' + fields.join(',') + ' FROM ' + source;

  return result;

}

exports.generarQueryFaltantes = function (tabla, ambiente1, ambiente2) {

  var result1 = generarQuerySelect(tabla, ambiente1);
  var result2 = generarQuerySelect(tabla, ambiente2);
  var query = 'SELECT TABLA1.' + result1.fields.join(', TABLA1.') + 
              ' FROM (' + result1.query + ') AS TABLA1 LEFT OUTER JOIN (' +
              result2.query + ') AS TABLA2 ON ';

  var condicion = [];
  var isNull = [];
  var verificacion = [];
  for (var indexField in result1.comparables) {
    var campo = result1.comparables[indexField];
    condicion.push('TABLA1.FIELD_' + campo + ' = TABLA2.FIELD_' + campo);
    isNull.push('TABLA2.FIELD_' + campo + ' IS NULL');
    verificacion.push('TABLA1.FIELD_' + campo + ' IS NOT NULL');

  }

  query += condicion.join(' AND ') + ' WHERE ' + isNull.join(' AND ')
          + ' AND (' + verificacion.join(' AND ') + ')';

  console.log(query);
  return query;

}

exports.generarQueryDiferentes = function (tabla, ambiente1, ambiente2) {

  var result1 = generarQuerySelect(tabla, ambiente1);
  var result2 = generarQuerySelect(tabla, ambiente2);
  var query = 'SELECT TABLA1.' + result1.fields.join(', TABLA1.') + 
              ' FROM (' + result1.query + ') AS TABLA1 LEFT JOIN (' +
              result2.query + ') AS TABLA2 ON ';

  var condicion = [];
  var verificacion = [];
  for (var indexField in result1.comparables) {
    var campo = result1.comparables[indexField];
    condicion.push('TABLA1.FIELD_' + campo + ' = TABLA2.FIELD_' + campo);
  }

  for (var indexField in result1.diferenciables) {
    var campo = result1.diferenciables[indexField];
    verificacion.push('TABLA1.FIELD_' + campo + ' <> TABLA2.FIELD_' + campo);
  }

  query += condicion.join(' AND ') + ' WHERE ' 
           + verificacion.join(' AND ');

  console.log(query);
  return query;

}


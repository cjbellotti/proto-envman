var async = require('async');
var generarScript = require('./generar-script');

function wrapGenerarScript(job, callback) {

	var result = {};
/*	for (var dc in job.registros) {

		var data = {
				target : job.target,
				registros : job.registros[dc]

		};
		result[dc] = generarScript(data, dc);

	}

  callback(result);*/

  var listaDc = Object.keys(job.registros);

  async.each(listaDc, function (dc, callback) {

    var data = {
      target : job.target,
      registros : job.registros[dc]
    };

    generarScript(data, dc, function (response) {

      result[dc] = response;

      callback();

    });

  }, function (err) {

    callback(err, result);

  });

}
module.exports = wrapGenerarScript;

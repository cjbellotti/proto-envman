var app = require('express')();
var manDB = require('./lib/mandb');
var manjob = require('./lib/manjob');
var async = require('async');
var bodyParser = require('body-parser');
var config = require('./config');

//var verif = require('./lib/verifications/01-registros');
var integridad = require('./lib/verifications/02-integridad');
var verif = require('./lib/verifications/10-registros');

app.use(bodyParser({ extended : false}));
app.use(bodyParser.json());

function verificar(job, callback) {

    var response = {};

    async.each(config.ambientes[job.target], function (dc, callback) {

      verif(manDB, job.target, dc.name, job.registros, function (err, result) {

          if (err) {
            response.err = err;
          } else {
            response[dc.name] = result;
          }

          integridad(response[dc.name], function() {
            callback();
          });

      }, true);
    }, function (err) {

      callback(err, response);

    });

}

app.post('/verificar/:id?', function (req, res) {

    if (req.params.id)
      manjob.read(parseInt(req.params.id), function (err, job) {

        verificar(job, function (err, response) {

          res.json(response)
            .end();

        });

      });
    else {

      var job = req.body;
      verificar(job, function (err, response) {

        res.json(response)
          .end();

      });

    }

});

module.exports = app;

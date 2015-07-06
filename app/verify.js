var app = require('express')();
var manDB = require('./lib/mandb');
var async = require('async');
var bodyParser = require('body-parser');
var config = require('./config');

var verif = require('./lib/verifications/01-registros');

app.use(bodyParser({ extended : false}));
app.use(bodyParser.json());

app.post('/verificar', function (req, res) {

    var response = {};
    var job = req.body;
    async.each(config.ambientes[job.target], function (dc, callback) {

      verif(manDB, job.target, dc.name, job.registros, function (err, result) {

          if (err) {
            response.err = err;
          } else {
            response[dc.name] = result;
          }

          callback();

      });
    }, function (err) {

      res.json(response)
        .end();

    });

});

module.exports = app;

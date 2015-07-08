var generarScript = require('./lib/generar-script-loop');
var app = require('express')();

app.post('/generar-script', function (req, res) {

  generarScript(req.body, function (err, response) {

    res.json(response)
      .end();

  });

});

module.exports = app;

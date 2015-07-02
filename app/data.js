var app = require('express')();
var methodOverride = require('method-override');
var mandb = require('./lib/mandb');

app.use(methodOverride());
app.get('/data/:ambiente/:dc/:tabla/:query?', function (req, res) {

  mandb(req.params.ambiente, req.params.dc, req.params.tabla, req.params.query,
    function (err, result) {
      var response = {};
      if (err){
        response = { err : err };
      }else
        response = result;

      res.json(response)
        .end();

    });

});

module.exports = app;

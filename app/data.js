var app = require('express')();
var methodOverride = require('method-override');
var mandb = require('./lib/mandb');

app.use(methodOverride());
app.get('/data/:ambiente/:dc/:tabla/:query?', function (req, res) {

  var where = '';
  if (req.params.query)
    where = 'where ' + req.params.query;

  var query = 'select * from ' + req.params.tabla + ' ' + where + ' order by id'; 
  mandb(req.params.ambiente, req.params.dc, query,
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

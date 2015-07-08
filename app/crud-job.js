var manjob = require('./lib/manjob');
var app = require('express')();

app.get('/job/:id?', function (req, res) {

  manjob.read(req.params.id, function (err, response) {

    res.json(response)
      .end();

  });

});

app.post('/job', function (req, res) {

  manjob.save(req.body, function (err, response) {

    res.json(response)
      .end();

  });

});

app.put('/job/:id', function (req, res) {

  manjob.update(req.params.id, req.body, function (err, response) {

    res.json(response)
      .end();

  });

});


module.exports = app;


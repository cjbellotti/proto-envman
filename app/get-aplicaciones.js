var fs = require('fs');
var express = require('express');

var app = express();

app.get('/get-aplicaciones', function (req, res) {

	fs.readFile(__dirname + '/data/aplicaciones.json', function (err, data) {

		data = JSON.parse(data.toString());
		res.json(data)
		   .end();

	});
});

module.exports = app;

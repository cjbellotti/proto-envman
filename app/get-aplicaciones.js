var fs = require('fs');
var express = require('express');

var app = express();

app.get('/get-aplicaciones', function (req, res) {

	fs.readFile('./data/aplicaciones.json', function (data) {

		data = JSON.parse(data.toString());
		res.json(data)
		   .end();

	});
});

module.exports = app;

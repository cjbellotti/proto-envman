var app = require('express')();
var config = require('./config'); 
var bodyParser = require('body-parser');
var async = require('async');
var _ = require('underscore');
var utils = require('./utilsSoa');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/soa-comparer-artefactos', function (req, res) { 
	generarData(_.keys(config.ambientes),function(data){res.json(data).end();});	
});

app.post('/soa-comparer-artefactos', function (req, res) {
	generarData(req.body.ambientes,function(data){res.json(data).end();});
});

function generarData(ambientes,callback){
	var data = {};
	async.each(ambientes,function(ambiente,next){
		utils.crearObjectSoa(ambiente,function(artefactos){
			data[ambiente] = artefactos;
			next();
		});
		},function(){
			utils.formatearData(data,function(response){
				callback(response);
			});
		});
}

module.exports = app;
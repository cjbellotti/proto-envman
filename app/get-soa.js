var app = require('express')();
var child_process = require('child_process');
var config = require('./config'); 
var bodyParser = require('body-parser');
var async = require('async');
var _ = require('underscore');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/soa-comparer', function (req, res) { 
	generarData(_.keys(config.ambientes),function(data){res.json(data).end();});	
});

app.post('/soa-comparer', function (req, res) {
	generarData(req.body.ambientes,function(data){res.json(data).end();});
});

function generarData(ambientes,callback){
	var data = {};
	async.each(ambientes,function(ambiente,next){
		crearObjectSoa(ambiente,function(artefactos){
			data[ambiente] = artefactos;
			next();
		});
		},function(){
			callback(data);
		});
}

function crearObjectSoa(ambiente,callback){
	var response = {};
	ejecutarComando(ambiente,function(err,artefactos){
		if(!err){
			response = artefactos;
		}else{
			response = err;
		}
		callback(response);
	});
}

function ejecutarComando(ambiente,callback){ 
	var artefactos = {};
	child_process.exec('cd appTest && node app.js ' + ambiente,{maxBuffer: 1024*1024},function(error, stdout, stderr){
		if(error){
			callback(error);
		}else{
			var stdoutString = stdout.toString();
			artefactos  = JSON.parse(stdoutString.substring('[INICIO]'.length,stdoutString.lastIndexOf('[FIN]')));
			callback(null,artefactos);
		}
	});
}

module.exports = app;
var app = require('express')();
var child_process = require('child_process');
var config = require('./config'); // se agrega el archivo config.js , para obtener los ambientes
var bodyParser = require('body-parser');
var data = {};
var soa = {};
this.artefactos = ''; 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// GET --> muestra todos los ambientes
app.get('/soa-comparer', function (req, res) { 
	var ambientes = Object.keys(config.ambientes);
	for(var index in ambientes){	
		crearObjectSoa(ambientes[index]);
	}
  	formatearData();
  	res.json(soa).end();
});

// POST --> muestra los ambientes que recibe en el vector pasado por parametro (ambientes)
app.post('/soa-comparer', function (req, res) {
	for(var index in req.body.ambientes){	
		crearObjectSoa(req.body.ambientes[index]);
	}
	formatearData();
	res.json(soa).end();
});

function crearObjectSoa(ambiente){
	data[ambiente] = [];
	data[ambiente] = ejecutarComando(ambiente);
}

function ejecutarComando(ambiente){ 
	var self = this;
	// cuando este la app de python , agregar en el exec el param ambiente recibido...
	child_process.exec('cd appTest && node app.js ' + ambiente,{maxBuffer: 1024*1024},function(error, stdout, stderr){
		var stdoutString = stdout.toString();
		self.artefactos  = stdoutString.substring('[INICIO]'.length,stdoutString.lastIndexOf('[FIN]'));
		self.artefactos  = JSON.parse(self.artefactos);
		if(error){
			console.log('error al ejecutar el comando ' + error);
		}
	});
	return self.artefactos;
}

function formatearData(){
  	for(var ambiente in data){
		for(var index in data[ambiente]){
			var artefacto = data[ambiente][index].artefacto ;
			if(!soa[artefacto]){
				soa[artefacto] = {};
				soa[artefacto].particion = data[ambiente][index].particion;
				soa[artefacto].ambientes = {} ;
				var allAmbientes = Object.keys(config.ambientes);
				for(var index2 in allAmbientes){
					soa[artefacto].ambientes[allAmbientes[index2]] = {};
				}
			}
			soa[artefacto].ambientes[ambiente] = {
				version : data[ambiente][index].version,
				fecha: data[ambiente][index].fechaDespliegue,
				diff: data[ambiente][index].diff 
			};
		}
	}
}

module.exports = app;

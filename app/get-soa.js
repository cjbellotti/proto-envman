var app = require('express')();
var child_process = require('child_process');
var config = require('./config'); // se agrega el archivo config.js , para obtener los ambientes
var bodyParser = require('body-parser');
var data = {};
this.artefactos = ''; 

app.use(bodyParser({ extended : false}));
app.use(bodyParser.json());

// GET --> muestra todos los ambientes
app.get('/soa-comparer', function (req, res) { 
	var ambientes = Object.keys(config.ambientes);
	for(var index in ambientes){	
		crearObjectSoa(ambientes[index]);
	}
  	res.json(data).end();	
});

// POST --> muestra los ambientes que recibe en el vector pasado por parametro (ambientes)
app.post('/soa-comparer', function (req, res) {
	for(var index in req.body.ambientes){	
		crearObjectSoa(req.body.ambientes[index]);
	}
	res.json(data).end();
});

function crearObjectSoa(ambiente){
	data[ambiente] = [];
	data[ambiente] = ejecutarComando(ambiente);
}

function ejecutarComando(ambiente){ 
	var self = this;
	// cuando este la app de python , agregar en el exec el param ambiente recibido...
	child_process.exec('cd appTest && node app.js',{maxBuffer: 1024*1024},function(error, stdout, stderr){
		var stdoutString = stdout.toString();
		self.artefactos  = stdoutString.substring('[INICIO]'.length,stdoutString.lastIndexOf('[FIN]'));
		self.artefactos  = JSON.parse(self.artefactos);
		if(error){
			console.log('error al ejecutar el comando ' + error);
		}
	});
	return self.artefactos;
}

module.exports = app;

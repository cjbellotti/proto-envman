var app = require('express')();
var child_process = require('child_process');
var method_override = require('method-override');
var config = require('./config'); // se agrega el archivo config.js , para obtener los ambientes

var soa = {}; // objeto que devuelve el servicio...
this.artefactos = ''; 

app.use(method_override());

// si la url se le agrega un parametro , ejecuta el comando para ese ambiente , ejemplo -> /soa-comparer?ambiente=DESA
// si la url viene sin parametro, ejecuta el comando para todos los ambientes
app.get('/soa-comparer', function (req, res) { 
	var ambiente = req.query.ambiente;
	console.log('ambiente : ' + ambiente);
	if(ambiente){
		crearObjectSoa(ambiente);
	}else{
		var ambientes = Object.keys(config.ambientes);
		for(var index in ambientes){	
			crearObjectSoa(ambientes[index]);
		}
	}
  	res.json(soa).end();	
});

function crearObjectSoa(ambiente){
	var data = [];
	soa[ambiente] = [];
	soa[ambiente] = ejecutarComando(ambiente);
}

function ejecutarComando(ambiente){ 
	var self = this;
	// cuando este la app de python , agregar en el exec el param ambiente recibido...
	child_process.exec('cd /home/mtorres/proto-envman/appTest/ && node app.js',{maxBuffer: 1024*1024},function(error, stdout, stderr){
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

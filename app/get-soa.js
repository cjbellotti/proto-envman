var app = require('express')();
var child_process = require('child_process');
var soa = require('./soa.js');
var method_override = require('method-override');

app.use(method_override());
app.get('/soa-comparer/:ambiente?', function (req, res) {
	//ejecutarComando('IST'); // el archivo txt, tiene el nombre del ambiente, esto no va, sacar despues....
  	res.json(soa).end();	
});

function ejecutarComando(ambiente){ // el comando tiene q recibir el ambiente...
	child_process.exec('cd /home/mtorres/proto-envman/appTest/ && node app.js',{maxBuffer: 1024*1024},function(error, stdout, stderr){
		var ouput = stdout.toString();
		soa = ouput.substring('[INICIO]'.length,ouput.lastIndexOf('[FIN]'));
		if(error){
			console.log('error al ejecutar el comando ' + error);
		}
	});
}

// todavia no se testio, si recibe por parametro el ambiente, ejecuta el script con ese ambiente, si viene null, ejecuta un script por ambiente...

/*
var tabla = {};
app.use(method_override());
app.get('/soa-comparer/:ambiente?', function (req, res) {
	if(req.params.ambiente){
		var artefactos = ejecutarComando(req.params.ambiente);
	}else{
		for(var index in window.ambientes){	//FIXME--> verificar si se puede obtener la variable de este lado...
			var artefactos = this.ejecutarComando(window.ambientes[index]);
		}
	}
	res.json(tabla).end();
});*/



module.exports = app;

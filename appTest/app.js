var fs = require('fs');

var ambiente = process.argv[2]; //levanta el argumento pasado al ejecutar la app

if(ambiente == 'DESA'){
	leerDatos('./DESA.txt');
}
if(ambiente == 'IST'){
	leerDatos('./IST.txt');
}
if(ambiente == 'UAT'){
	leerDatos('./UAT.txt');
}

function leerDatos(path){
	fs.readFile(path,function(err,content){
		if(err){
			console.log(err);
		}else{
			console.log(content.toString());
		}
	});
}



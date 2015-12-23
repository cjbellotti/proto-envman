var child_process = require('child_process');
var config = require('./config'); 
var _ = require('underscore');

module.exports = {
	
	crearObjectSoa: function(ambiente,callback){
		var response = {};
		this.ejecutarComando(ambiente,function(err,artefactos){
			if(!err){
				response = artefactos;
			}else{
				response = err;
			}
			callback(response);
		});
	},

	ejecutarComando: function(ambiente,callback){
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
	},

	formatearData: function(data,callback){
		var artefactos = {};
		var ambientes = _.keys(config.ambientes);
	    for(var ambiente in data){    
	      for(var index in data[ambiente]){   
	         var artefacto = data[ambiente][index].artefacto;   
	         if(!artefactos[artefacto]){    
	          artefactos[artefacto] = {};    
	          artefactos[artefacto].particion = data[ambiente][index].particion;   
	          artefactos[artefacto].ambientes = {} ;   
	            for(var index2 in ambientes){    
	               artefactos[artefacto].ambientes[ambientes[index2]] = {};    
	            }   
	         }   
	        artefactos[artefacto].ambientes[ambiente] = {    
	          version : data[ambiente][index].version,    
	          fecha: data[ambiente][index].fechaDespliegue,   
	          diff: data[ambiente][index].diff    
	        };    
	      }   
	    }
	    this.modificarVersionesDistintas(artefactos);  
	    callback(artefactos); 
	},

	modificarVersionesDistintas: function(artefactos){
	 	for (var artefacto in artefactos) {
			  var diff = false;
		      var version = "";
		      for (var ambiente in artefactos[artefacto].ambientes) {
		        if (version == ""){
		        	version = artefactos[artefacto].ambientes[ambiente].version;
		        }
		        else{
		        	if (version != artefactos[artefacto].ambientes[ambiente].version){
		        		diff = true;
		        	}
		        }
		      }
		      for (var ambiente in artefactos[artefacto].ambientes) {
		        artefactos[artefacto].ambientes[ambiente].diff = diff;
		      }
	  	}
	}

}







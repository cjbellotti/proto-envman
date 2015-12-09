var fs = require('fs');

fs.readFile('./datos.txt',function(err,content){
	if(err){
		console.log(err);
	}else{
		console.log(content.toString());
	}
});

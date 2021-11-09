var app    = require('express')();
var http   = require('http').Server(app);
var fs     = require('fs');
var cfg    = require("./config.js").cfg();
var filter = require("./js/filter.js"); // filters malicious invalid url's 

if(cfg.useCors){app.use(require('cors')())}     // enable CORS
if(cfg.useCompression){app.use(compression())}  // enable COMPRESION

app.use(function(req,res,next){
	if(!filter.filter(req)){return res.status(404).send({msg:"Invalid Request",error:"wrong format"})}
	res.header("X-Powered-By", cfg.webApp);
	next();
});

function response(filep,res){
	fs.exists(filep,function(exists){
  			if(exists){
  				var ss = fs.createReadStream(filep);
				ss.pipe(res);
				ss.on("error",function(err){
						try{res.status(404).send("File not found")} catch(x){}
				});
  			} else {
				res.status(404).send("File not found");
  			}
		});
}

app.get('/', function(req, res){
		//var filep = cfg.webroot + "/" + cfg.startPage
		response(cfg.webroot + "/" + cfg.startPage,res);
});

app.get('/*', function(req, res){
		//var filep = cfg.webroot + req.url
		response(cfg.webroot + req.url,res);
});

console.reset = function (){return process.stdout.write('\033c')};console.reset();
http.listen(cfg.httpport, function(){
  console.reset();
  console.log();
  console.info('-------------------------------');
  console.info('-  Static WEB  -  server      -');
  console.info('-  Listening on : '+cfg.httpport);
  console.info('-------------------------------');
})

app.options('*',function(req,res){
	return res.end()
});


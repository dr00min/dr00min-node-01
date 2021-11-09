var app    = require('express')();
var http   = require('http').Server(app);
var fs     = require('fs');
var cfg    = require("./config.js").cfg();
var filter = require("./js/filter.js"); // filters malicious invalid url's 
var cesmod = require("./js/cesmod.js");

process.sslOptions = {};

try {
	process.sslOptions.key = fs.readFileSync('keys/service.key').toString();
	process.sslOptions.cert = fs.readFileSync('keys/service.crt').toString();
} catch(x){}

if(!process.sslOptions.cert){
	cesmod.newcertificate(false,"service","keys",function(err,cert){
		if(err){console.log("Certificate error!",err)}
		if(cert){process.sslOptions.key=cert.serviceKey; process.sslOptions.cert = cert.certificate}
	});
}

var https  	= require('https').Server(process.sslOptions,app);

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
https.listen(cfg.httpsport, function(){
  console.reset();
  console.log();
  console.info('-------------------------------');
  console.info('-  Static WEB  -  server');
  console.info('-  Listening on : '+cfg.httpsport);
  console.info('-------------------------------');
})

app.options('*',function(req,res){
	return res.end()
});


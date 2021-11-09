pem = require('pem');
fs  = require('fs');

// https://www.deineagentur.com/projects/pem/module-pem.html#.createCSR

var co = {
	country:"DE",
	locality:"Frankfurt",
	organisation:"Inter-Comm-Res",
	organizationUnit:"IT",
	commonName:"self-signed.ext",
	days:20*365,
	selfSigned: true
}

var colo = {
	country:"RO",
	state:"B",
	locality:"Bucharest",
	organization:"dev",
	organizationUnit:"team1",
	commonName:"localhost",
	emailAddress:"team1@dev.ro",
	days:20*365
};

module.exports = {
	newcertificate:function(copt,name,path,next){ //  service  ./ssl/
		var copt1 = {}
		pem.createPrivateKey(2048,n1);
		function n1(err,key){
			if(!copt || !copt.commonName){copt=co};
			if (err){return next(err)}
			copt1.serviceKey = key.key;
			fs.writeFileSync(path + "/" + name + 'sign.key', key.key);
			pem.createCSR(copt,n2);
		};
		function n2(err,csr){
			if (err){return next(err)}
			//console.log(csr);
			copt1.selfSigned = true;
			copt1.csr  = csr.csr;
			copt1.days = copt.days;
			copt1.selfSigned = true;
			pem.createCertificate(copt1, n3)
		};
		function n3(err,cert){
			if (err){console.log(err);return next(err,false)}
			//console.log(cert);
			fs.writeFileSync(path +"/"+ name + '.crt', cert.certificate);
			fs.writeFileSync(path +"/"+ name + '.key', cert.serviceKey);
			return next(false,cert);
		};
	},
	readcertificate:function(c,next){
		pem.readCertificateInfo(c, next);
	},
	checkcertificate:function(c,l,next){
		pem.verifySigningChain(c,l,next);
	},
	readpubkey:function(c,next){
		pem.getPublicKey(c, next)
	}
}

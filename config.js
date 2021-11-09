module.exports={
	cfg:function(){
		return {
			httpport:80,
			httpsport:443,
			webroot:"./assets",
			startPage:"index.html",
			useCors:true,
			useCompresion:true,
			webApp:"webServer"
		}	
	}
}
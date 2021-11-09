module.exports = {
	filter:function(req,res){

		if(req.url.search("burpcollaborator.net")>-1){kka(req);return false};
		// decodeURIComponent(val)
		var urierror = false;
		try { 
  			var a = decodeURIComponent(req.url);
		} catch(e) { 
  			urierror = true
		}
		if(urierror){kka(req);return false}
		
		var spl = req.url.split("?");
		var crt = spl[0].toLowerCase();
		if(spl[1] && spl[1].length>2000){kka(req);return false}
		if(crt.length>1000){return false}
		if(crt.search("%2e")>-1){kka(req);return false}
		if(crt.search("%c0")>-1){kka(req);return false}
		if(crt.search("%25")>-1){kka(req);return false}
		if(crt.search("%00")>-1){kka(req);return false}
		if(crt.search("%ae")>-1){kka(req);return false}
		if(crt.search("%2f")>-1){kka(req);return false}
		if(crt.search("%5c")>-1){kka(req);return false}
		if(crt.search(".php")>-1){kka(req);return false}
		if(crt.search("time.sleep")>-1){kka(req);return false}
		if(crt.split("select(").length>1){kka(req);return false}
		if(crt.split("function(").length>1){kka(req);return false}
		if(crt.split("eval(").length>1){kka(req);return false}
		if(crt.split("sleep(").length>1){kka(req);return false}
		if(crt.split("..").length>1){kka(req);return false}
		if(spl[1]){
			var xe = spl[1].toLocaleLowerCase();
			if(xe.search("nslookup")>-1){kka(req);return false}
			if(xe.search("compile")>-1){kka(req);return false}
			if(xe.search("declare")>-1){kka(req);return false}
			if(xe.search("xmlschema-instance")>-1){kka(req);return false}
			if(xe.search("extractvalue")>-1){kka(req);return false}
			if(xe.search("function")>-1){kka(req);return false}
			if(xe.search("select")>-1){kka(req);return false}
			if(xe.search("extractvalue")>-1){kka(req);return false}
		}
		return true;
	}
}

function kka(req){
	console.log("Attack:",req.url,new Date());
}
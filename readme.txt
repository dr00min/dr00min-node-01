NodeJS web server based on Express

pm2  - service process manager
npm  - packet manager
node - NodeJs


----------------------------------------
web80.js  - port 80 web server (http)
web443.js - port 443 web server (https)
----------------------------------------

It can be used to serve a static website or to add more web services on top.

One sample web-site is set in "assets" folder

Edit config.js file
- change servers ports
- set the web root folder

----------------------------------------

Add Webservices using the web443.js (webservices should use HTTPS).
You will need to add a post body parser into the project first.
// try https://www.npmjs.com/package/body-parser or find another  

app.post('/sample/path', function(req, res){
		// ...		
		// ...
		return res.send({service:"OK"})
});

----------------------------------------

The presented webserver is a NodeJS sample project.
Feel free to use it or develop on top of it.

License is MIT

This project is not commercialy supported however you can email support@qbis.ro 
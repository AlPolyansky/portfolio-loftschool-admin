'use strict'

let fs = require('fs');
let path = require('path');
let express = require('express');
let pug = require('pug');
let config = require('./config.json');
let app = express();
let mongoose = require('./mongoose.js');
let bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', path.resolve(`./views/pages/`));

app.use(express.static(path.resolve(config.http.publicRoot)));
app.use(bodyParser.json());

//===маршруты===
//app.use('/admin', require('./routes/admin/about.js'));
app.use('/admin', require('./routes/admin/blog.js'));
app.use('/',require('./routes/front.js'));
//=============

app.use((req, res, next) => res.status(404).send('Не удается найти страницу!'));

app.use((err,req,res,next) =>{
	res.status(500);
	res.render('error', {error : err.message});
	console.error(err.message,err.stack);
})


app.listen(config.http.port, config.http.host, () => {
	let uploadDir = path.resolve(config.http.publicRoot, 'upload');

	if(!fs.existsSync(uploadDir)){
		fs.mkdirSync(uploadDir);
	}

	console.log(`Server is up on ${config.http.host}:${config.http.port}!`);

});


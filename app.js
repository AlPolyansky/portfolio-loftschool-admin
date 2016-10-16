var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var pug = require('pug');
var bodyParser = require('body-parser');
var config = require('./config.json');


var jsonParser = bodyParser.json();
var app = express();

app.use(session({ secret: 'keyboard cat', saveUninitialized: true,resave: true}));

// Подключаем шаблонизатор

app.set('view engine', 'pug');


// Подключаем статические файлы
app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/fonts',express.static(path.join(__dirname, 'public/fonts')));


// Маршруты


// Home page
app.get('/', function (req, res) {
	var data = {
		name: 'Александр Полянский'
	}
  res.render('pages/index', data);
});

// Works page
app.get('/works.html', function (req, res) {
  res.render('pages/works');
});


// About page
app.get('/about.html', function (req, res) {
  res.render('pages/about');
});


// Blog page
app.get('/blog.html', function (req, res) {
  res.render('pages/blog');
});



// Admin page
app.get('/admin.html', function (req, res) {
	sess = req.session;
	if(sess.pass === config.admin.pass && sess.user === config.admin.user){
		res.render('pages/admin');
	}else{
		res.send('Доступ запрещен')
	}
});


app.post('/admin',jsonParser, function (req, res){
	
	if(req.body.pass === config.admin.pass){
		sess = req.session;
		sess.pass = req.body.pass;
		sess.user = req.body.user;
  	res.sendStatus(200);
	}else{
		res.sendStatus(403);
	}
	
})




/*app.use(function(req,res){
	if(req.url == '/' || req.url == '/index.html'){
		res.end('<h1>Главная страница</h1>');
	}
});*/






/*app.use(express.static('public'));*/

app.listen(config.http.port,config.http.host, function () {
  console.log('Example app listening on port ' + config.http.port);
});
var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var pug = require('pug');
var bodyParser = require('body-parser');
var config = require('./config.json');
//var db = require('./DB/index.js');
//var model = require('./DB/models.js');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/portfolio');
var Schema = mongoose.Schema;
var skills = require('./modules/skills.json');


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





// Модели




var skillShema = new Schema({
	section: {
		type: String
	},
	items : {
		type: [{
			skillName : {
				type: String
			},
			value : {
				type: Number,
				default: 0
			}
		}]
	}
});

var skillModel = mongoose.model('Skill',skillShema);














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



// admin login
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


// skills 

app.post('/skills',jsonParser, function(req,res){

	
	var resultObj = req.body;
	// Сохранение скилов в базу
	var test = Object.keys(resultObj);
	
	var models = [];

	Object.keys(resultObj).map(section =>({
		section: section,
		items: Object.keys(req.body[section]).map(i => ({
			skillName: i,
			value: req.body[section][i]
		}))
	})).forEach(toSave => models.push(new skillModel(toSave)));

	skillModel.remove({}).then(() =>
		skillModel.insertMany(models).then(() =>
			console.log('Сохранено')
		)
	);

	//console.log(models);
/*	return false;
	resultObj.forEach(function(item){
	var skill = skillModel({
		section : item.name,
		items : Object.keys(item.items).map(i => ({
			skillName : i,
			value : 10
		}))

	})
	console.log(skill);
	});*/

/*	for (var key in req.body){
		var skills = new Skill({
			name : req.body[key].name,
			percent : req.body[key].percent
		})
		Skill.remove({},function(){
		}).then(function(){
			skills.save(function(){})
		})

		
	}*/	
});


// Admin page
app.get('/admin.html', function (req, res) {
// Костыль ! Переделать на промисы

	// Пришло из базы

	console.log(skillModel.find({},function(err, items){items}));
res.render('pages/admin',{
		section : skills,
		test : skillModel.find({},function(err, items){}),
	});



/*	Skill.find({},function(err,items){
			
			items.forEach(function(item){
				arr.push([item.name,item.percent]);
			});
			
		}).then(function(){
		console.log(arr);
	})*/
	

	
	
	return true;


	sess = req.session;
	if(sess.pass === config.admin.pass && sess.user === config.admin.user){
		res.render('pages/admin');
	}else{
		res.send('Доступ запрещен')
	}
});









app.listen(config.http.port,config.http.host, function () {
  console.log('Example app listening on port ' + config.http.port);
});


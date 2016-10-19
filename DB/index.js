var mongoose = require('mongoose');
var models = require('./models.js');

var model = mongoose.models

//Подключение к базе данных portfolio
var db = mongoose.connect('mongodb://localhost/portfolio');


var post = new model.Post({
	data: '14.10.2016',
	title: 'Я изучил mongodb',
	body: 'Текст ....'
})


/*skill.save(function(error) {
	if(error){
		console.log("Произошла ошибка");
	}else{
		console.log("Все хорошо");
	}
});*/

/*var post2 = new Post({
	data: '14.10.2017',
	title: 'Я изучил angular',
	body: 'Текст ....123'
})*/

//console.log(model.Skill.find());





/*model.Post.find({},function(err,items){
	items.forEach(function(item){
		console.log(item.data, item.title, item.body);
	})
})*/


//console.log(db.connections.base);

/*post.save(function(error) {
	if(error){
		console.log("Произошла ошибка");
	}else{
		console.log("Все хорошо");
	}
});*/

var mongoose = require('mongoose');
var models = require('./models.js');

var model = mongoose.models


mongoose.connect('mongodb://localhost/portfolio');


var post = new model.Post({
	data: '14.10.2016',
	title: 'Я изучил mongodb',
	body: 'Текст ....'
})

/*var post2 = new Post({
	data: '14.10.2017',
	title: 'Я изучил angular',
	body: 'Текст ....123'
})*/



model.Post.find({},function(err,items){
	items.forEach(function(item){
		console.log(item.data, item.title, item.body);
	})
})

/*post.save(function(error) {
	if(error){
		console.log("Произошла ошибка");
	}else{
		console.log("Все хорошо");
	}
});*/

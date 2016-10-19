var mongoose = require('mongoose');


var Post = mongoose.model('Post', {
	data: String,
	title: String,
	body: String
});


var Skill = mongoose.model('Skill',{
	skillName: String,
	percent: String
});

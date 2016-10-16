var mongoose = require('mongoose');


var Post = mongoose.model('Post', {
	data: String,
	title: String,
	body: String
});

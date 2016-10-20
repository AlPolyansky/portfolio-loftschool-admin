'use strict'

let mongoose = require('mongoose');
var BlogSchema = new mongoose.Schema({
		title: {
			type: String,
			require: [true, 'Укажите заголовок статьи']
		},
		body: {
			type: String,
			require: [true,'Укажите содержимое статьи']
		},
		date: {
			type: String,
			require: [true,'Укажите дату публикации']
		}
}, {strict: false});

mongoose.model('post',BlogSchema);
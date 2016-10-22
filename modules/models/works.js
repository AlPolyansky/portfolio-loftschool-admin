'use strict'

let mongoose = require('mongoose');
var WorkSchema = new mongoose.Schema({
		name: {
			type: String,
			require: [true, 'Укажите заголовок статьи']
		},
		tech: {
			type: String,
			require: [true,'Укажите содержимое статьи']
		},
		link: {
			type: String,
			require: [true,'Укажите дату публикации']
		},
		pictures : {
			type: [String]
		}
}, {strict: false});

mongoose.model('work',WorkSchema);
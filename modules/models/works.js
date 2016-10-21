let mongoose = require('mongoose');
	Schema = mongoose.Schema,
	WorkSchema = new Schema({
		name: {
			type: String,
			require: [true, 'Укажите имя проекта']
		},
		tech: {
			type: String,
			require: [true,'Укажите используемые технологии']
		},
		link: {
			type: String,
			require: [true, 'Укажите ссылку на проекты']
		},
		pictures : {
			type: [String]
		}
	});

mongoose.model('work',TechSchema);
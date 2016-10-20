let mongoose = require('mongoose');
	Schema = mongoose.Schema,
	TechSchema = new Schema({
		section : {
			type: String
		},
		items : {
			type: [{
				name : {
					type: String
				},
				value : {
					type: {
						type: Number,
						default: 0
					}
				}
			}]
		}
	});

mongoose.model('tech',TechSchema);
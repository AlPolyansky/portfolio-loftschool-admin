'use strict'
let route = require('express').Router();
let mongoose = require('mongoose');
let tech = require('../../modules/skills.json');

require('../../modules/models/tech.js');



route.get('', (req,res) => {
	let Model = mongoose.model('tech');

	Model.find().then(items => {
		let form = items.reduce((prev, cur) =>{
			prev[cur.section] = cur.items.reduce((prev, cur) => {
				prev[cur.name] = cur.value;
				return prev;
			}, {});

			return prev;
		}, {});
		res.render('admin',{tech: tech, form: form});
	});
});

route.post('/about',(req,res)=>{

	let Model = mongoose.model('tech');
	let models = [];
	if(!Object.keys(req.body).length){
		return res.json({ message: 'Не удалось сохранить данные!' });
	}
/*	if(req.body){
		console.log('Прошло');
		return res.json({ error: 'Не удалось сохранить данные!' });
	}*/

	Object.keys(req.body).map(section => ({
		section: section,
		items: Object.keys(req.body[section]).map(i => ({
			name: i,
			value: req.body[section][i]
		}))
	})).forEach(toSave => models.push(new Model(toSave)));

	if(models.filter(m => m.validateSync()).lenght){
		return res.json({ error: 'Не удалось сохранить данные!' });
	}

	Model.remove({}).then(() =>
		Model.insertMany(models).then(() =>
			res.json({ message: 'Сохранено'})
		)
	)

	

});

module.exports = route;
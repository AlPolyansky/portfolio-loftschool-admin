'use strict'
let route = require('express').Router();
let mongoose = require('mongoose');

// Сохранение записи в базу

require('../../modules/models/blog_model.js');



route.post('/blog',(req,res)=>{
var blogModel = mongoose.model('post');
	var item = new blogModel({
			title: req.body.itemName,
			date: req.body.itemDate,
			body: req.body.itemBody
	});
	item.save().then(
		i => res.json({ message: 'Запись успешно добавлена!'}),
		e => {
			let error = Object.keys(e.error)
				.map(key => e.errors[key].message)
				.join(', ');

				res.json({error: error});
	});
})



module.exports = route; 
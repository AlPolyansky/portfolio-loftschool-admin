'use strict'
let route = require('express').Router();
let mongoose = require('mongoose');
let tech = require('../modules/skills.json');

route.get('/',(req,res) =>{
	res.render('index')
})

route.get('/blog.html',(req,res) =>{
	let Model = mongoose.model('post');

	Model.find().then(items => {
		res.render('blog',{items: items})
	})
	
})

route.get('/about.html',(req,res) =>{
let Model = mongoose.model('tech');

	Model.find().then(items => {
		let form = items.reduce((prev, cur) =>{
			prev[cur.section] = cur.items.reduce((prev, cur) => {
				prev[cur.name] = cur.value;
				return prev;
			}, {});

			return prev;
		}, {});
		res.render('about', {tech: tech, form: form});
	});
})

route.get('/works.html',(req,res) =>{
	let Model = mongoose.model('work');

	Model.find().then(items => {
		res.render('works', {items: items});
	});
})


module.exports = route;
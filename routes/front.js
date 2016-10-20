'use strict'
let route = require('express').Router();
let mongoose = require('mongoose');

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
	res.render('about')
})

route.get('/works.html',(req,res) =>{
	res.render('works')
})

route.get('/admin.html',(req,res) =>{
	res.render('admin')
})

module.exports = route;
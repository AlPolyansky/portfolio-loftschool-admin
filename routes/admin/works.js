'use strict'
let fs = require('fs');
let route = require('express').Router();
let mongoose = require('mongoose');
let path = require('path');
let multiparty = require('multiparty');
let config = require('../../config.json');

// Сохранение записи в базу

//require('../../modules/models/works.js');



route.post('/works',(req,res)=>{
	//var blogModel = mongoose.model('work');
	let form = new multiparty.Form();
	form.parse(req, function(){
		console.log(req.body);
	})
	
})



module.exports = route; 
'use strict'
let route = require('express').Router();
let mongoose = require('mongoose');
let crypto = require('crypto');



require('../../modules/models/user.js');



route.post('/',(req,res)=>{
	if(!req.body.login || !req.body.password) {
		return res.json({ error: 'Укажите логин и пароль'})
	}

	let Model = mongoose.model('user');
	let password = crypto.createHash('md5')
		.update(req.body.password)
		.digest('hex');

	Model.findOne({
		login: req.body.login,
		password: req.body.password
	}).then(item => {
		if(!item){
			//res.json({error : 'Логин и/или пароль введены неверно!' });
			res.sendStatus(403);
		}else{
			req.session.isAdmin = true;
			res.json('Успешно')
		}
	});

});



module.exports = route; 
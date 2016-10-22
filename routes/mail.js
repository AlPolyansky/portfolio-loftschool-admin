'use strict'

let route = require('express').Router();
let nodemailer = require('nodemailer');
let config = require('../config.json');


route.post('/',(req,res) =>{
	let transporter = nodemailer.createTransport(config.mail.smtp)
	let mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`, 
    to: config.mail.smtp.auth.user, 
    subject: config.mail.subject, 
    text: req.body.text.trim().slice(0, 500)
};


transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response)
});

});

module.exports = route;
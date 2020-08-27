'use strict';
const express = require('express');
const router = express.Router();
const auth = require('./middleware.js')
const user = require('./users.schema.js')
const oauth = require('./oaut-middleware.js')

router.post('/signup', (req,res, next) => {
    user.create(req.body)
    .then(userInfo =>{
    //     let token = user.generateToken()
    //     let responce = {
    //         'user': userInfo,
    //         'token': token
    //     }
        res.status(200).json(userInfo)
    })
})

router.post('/signin', auth, (req, res, next) => { 
    res.cookie('auth', req.token)
     res.send({
         token: req.token,
         user: req.user
     })
    })

router.get('/oauth', oauth, (req, res) => {
        res.status(200).send(req.token);
    });
    
    

router.get('/users',(req, res, next) => {
    user.find()
    .then(info => {
        res.status(200).json(info);
    })   
    
})





module.exports = router;
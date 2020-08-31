'use strict';

const express = require('express');
const bearerMiddleware = require('./bearer-auth.js');
const permissions = require('./authorize.js');
const router = express.Router();

router.get('/secret', bearerMiddleware, (req,res) => {
    console.log('in route')
    res.status(200).send('access')
} )

router.get('/read', bearerMiddleware, permissions('read'), routeHandler)
router.post('/add', bearerMiddleware, permissions('create'), routeHandler)
router.put('/change', bearerMiddleware, permissions('update'), routeHandler)
router.delete('/remove', bearerMiddleware, permissions('delete'), routeHandler)


function routeHandler(req, res) {
    res.status(200).send('Access Granted');
  }

module.exports = router;
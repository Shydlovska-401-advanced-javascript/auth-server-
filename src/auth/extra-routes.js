'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./bearer-auth.js')

router.get('/secret', bearerMiddleware, (req,res) => {
    console.log('in route')
    res.status(200).send('access')
} )

module.exports = router;
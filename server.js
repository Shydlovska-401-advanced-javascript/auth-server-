'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const route = require('./src/auth/routes.js')
const oauth = require('./src/auth/oaut-middleware.js')
const extraRoute = require('./src/auth/extra-routes.js')
const bearerAuth = require('./src/auth/bearer-auth.js')



// Prepare the express app
const app = express();

// App Level MW
app.use(express.static('./public'));
app.use(express.json());
app.use(route);
app.use(extraRoute);
app.use(oauth);
app.use(bearerAuth);



module.exports = {
    server:app,
    start: port =>{
        const PORT = port || process.env.PORT || 3000;
        app.listen(3000,  () => console.log(`Listening on ${PORT}`));
    }
}
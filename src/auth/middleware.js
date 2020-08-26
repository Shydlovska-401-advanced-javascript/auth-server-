'use strict';

const base64 = require('base-64');

const users = require('./users.schema.js');

module.exports = (req, res, next) => {
    

  // req.headers.authorization should be : "Basic sdkjdsljd="
//   console.log(req.header('authorization'))
  if (!req.headers.authorization) { next({'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unathorized'}); return; }
  
//   or return simple 'Invalid login'

  // Pull out just the encoded part by splitting the header into an array on the space and popping off the 2nd element
  let basic = req.headers.authorization.split(' ').pop();

  // decodes to user:pass and splits it to an array
  let [user, pass] = base64.decode(basic).split(':');

  

  // Is this user ok?
  users.authenticateBasic(user, pass)
    .then(validUser => {
      req.token = users.generateToken(validUser);
      req.user = user;
      next();
    })
    .catch(err => {
        console.log(err);
        next('Invalid Login')
    });

}





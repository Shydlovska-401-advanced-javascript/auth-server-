'use strict';

const base64 = require('base-64');

const users = require('./users.schema.js');

module.exports =  async (req, res, next) => {
    

  // req.headers.authorization should be : "Basic sdkjdsljd="
//   console.log(req.header('authorization'))
  if (!req.headers.authorization) { next({'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized'}); return; }
  
//   or return simple 'Invalid login'

  // Pull out just the encoded part by splitting the header into an array on the space and popping off the 2nd element
  let basic = req.headers.authorization.split(' ').pop();

  // decodes to user:pass and splits it to an array
  let [user, pass] = base64.decode(basic).split(':');
  
  try {
  const validUser = await users.authenticateBasic(user, pass);
  req.token = validUser.generateToken();
  console.log("i'm hereeeeeeeeeeeeeeeeeeee")
  req.user = validUser;
  next();

    } catch (err) {
  next({ 'message': 'Invalid User ID/Password', 'status': 401, 'statusMessage': 'Unauthorized' });
}


};


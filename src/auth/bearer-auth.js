 
'use strict';

const users = require('./users.schema.js');

module.exports = async (req, res, next) => {
  // req.headers.authorization should be : "Bearer slfldsf.alfjdslfjdsflj.sflasdjfdlsj"

  if (!req.headers.authorization) { next('Invalid Login'); return; }

  // Pull out just the encoded part by splitting the header into an array on the space and popping off the 2nd element
  let token = req.headers.authorization.split(' ').pop();

  console.log(token)


  try{
  
 const validUser = await users.authenticateToken(token);
 req.user = validUser;

 req.user = {
  username: validUser.username,
  fullname: validUser.fullname,
  email: validUser.email,
  capabilities: validUser.capabilities,
};
 next();

  } catch (err) {
    console.log(err)
next('Invalid Token')
  }
}
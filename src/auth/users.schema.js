'use strict';

require('dotenv').config();
const moment = require('moment');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password :{ type: String, required: true },
  email: { type: String },
  fullname: { type: String},
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'], required: true} ,
  
});

users.pre('save', async function(){
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 10);    
       
    }
  
});


users.statics.authenticateBasic = async function(username, password){
    let query = {username: username};
    const user = await this.findOne(query)
     return user && await user.comparePassword(password) ? user : null
    
}

users.statics.authenticateToken = async function (token){
    let expDate = new moment(token.iat).add(1, 'h');
    let now = new moment();
    if(!now.isBefore(expDate)){
        return Promise.reject('Expared token')
    }
    let parsedToken = jwt.verify(token, process.env.SECRET);
    return this.findById(parsedToken.id);
};

users.methods.comparePassword = async function(plainPassword){
    let isValid =  await bcrypt.compare(plainPassword, this.password)
    return isValid ? this:null;
   

}

users.methods.generateToken = function(){
    let token = {
        id: this._id,
        role: this.role,
    }
    let result = jwt.sign(token, process.env.SECRET)
     return result;
}


users.statics.createFromOauth = async function(email){
    if(!email){
        return Promise.reject('Validation Error');
    }

    const user = await this.findOne({email});
     if (user) {
         return user;
     } else{
        return this.create({username: email, password: 'none', email:email, role: 'admin'});
    }

  
}






module.exports = mongoose.model('users', users);

 
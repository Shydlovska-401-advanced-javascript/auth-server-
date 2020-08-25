'use strict';

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

users.pre('create', async function(){
    if(this.isModified('password')){
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(this.password, salt, function(e, hash) {
                return hash;
            });
        
        })
    }
  
});

users.statics.authenticateBasic= function(username, password){
    let query = {username: username};
    return this.findOne(query)
    .then(user => {
        return user && user.comparePassword(password) ? user : null
    })
    .catch(console.error);
};

users.methods.comparePassword = function(plainPassword){
    return bcrypt.compare(plainPassword, this.password)
    .then(valid => valid);
   

}

users.statics.generateToken = function(user){
     return jwt.sign({ username: user.username }, process.env.SECRET);
}

module.exports = mongoose.model('users', users);

 
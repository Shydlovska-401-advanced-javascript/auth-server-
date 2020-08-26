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

// users.pre('create', async function(){
//     if(this.isModified('password')){
//         bcrypt.genSalt(10, function(err, salt){
//             bcrypt.hash(this.password, salt, function(e, hash) {
//                 return hash;
//             });
        
//         })
//     }
  
// });

users.pre('save', async function(){
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 10);    
       
    }
  
});


users.statics.authenticateBasic= function(username, password){
    let query = {username: username};
    return this.findOne(query)
    .then(user => {
        return user && user.comparePassword(password) ? user : null
    })
}


users.methods.comparePassword =  async function(plainPassword){
    let isValid =  await bcrypt.compare(plainPassword, this.password)
    return isValid ? this:null;
   

}

users.methods.generateToken = function(){
     return jwt.sign({ role: this.role}, process.env.SECRET);
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

 
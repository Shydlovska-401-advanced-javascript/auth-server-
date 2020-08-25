'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect('mongodb://localhost:27017/users', mongooseOptions);


require('./server.js').start(process.env.PORT);


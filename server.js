const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express()
const PORT = 8080
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/assessment5')
.then(
    () => {
      console.log('Connected to mongoDB');
    },
    (err) => console.log('Error connecting to mongoDB', err)
  );
 //other imports
const usersRoute = require('../routes/users');

//other app.use statements
app.use('/api/users', usersRoute);


  app.use(bodyParser.json());
  app.use(cookieParser());
 
app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
})

module.exports = { app };
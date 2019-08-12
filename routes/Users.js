const express = require("express")
const users = express.Router();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// var isAuth=require('../middleware/isAuth');
const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    firstname: req.body.firstname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    mobileNumber: req.body.mobileNumber,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        if (req.body.password !== req.body.confirmPassword) {
          res.send("password does not match");
          res.json("password does not match");
        }
        else {
          res.json({ error: 'User already exists' })
        }
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            firstname: user.firstname,
            username: user.username,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          res.json({ error: 'incorrect password' })
        }
      } else {
        res.json({ error: 'User does not  exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// users.get('/profileReg', (req, res) => {
//    const decoded = jwt.verify(req.header['authorization'], process.env.SECRET_KEY)

//     User.findOne({
//         _id: decoded._id
//     })
//     .then(user => {
//         if(user) {
//             res.json(user)
//         }else{
//             res.send("User does not exist")
//         }
//     })
//     .catch(err => {
//         res.send('error: ' + err)
//     })
// })


module.exports = users;
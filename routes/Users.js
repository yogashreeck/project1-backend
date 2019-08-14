const express = require("express")
const users = express.Router();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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
        }
        else {
          res.send('incorrect password');
        }
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users;
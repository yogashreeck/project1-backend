const express = require("express")
const profile = express.Router();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const StudentProfile = require("../models/StudentProfile")
profile.use(cors())

// process.env.SECRET_KEY - 'secret'

profile.post('/studentProfile', (req, res) => {
  const userData = {
    studentname: req.body.studentname,
    address: req.body.address,
    email: req.body.email,
    course: req.body.course,
    mobileNumber: req.body.mobileNumber
  }
  StudentProfile.findOne({
    studentname: req.body.studentname,
    address: req.body.address,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber
  })
    .then(user => {
      if (!user) {
        // bcrypt.hash(req.body.studentname, 10, (err,hash) => {
        StudentProfile.create(userData)
          .then(user => {
            res.json({ status: 'student registered!' })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        // })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
profile.get('/studentProfile', (req, res) => {
  //    const decoded = jwt.verify(req.header['authorization'], process.env.SECRET_KEY)
  console.log(req)
  StudentProfile.find({
    studentname: req.query['studentname']
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send("User does not exist")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

profile.delete('/studentProfile/:id', (req, res) => {
  console.log(req.params)
  StudentProfile.findOneAndDelete({
    // _id: decoded._id
    studentname: req.params['studentname']
  })
    .then(user => {
      if (user) {
        res.send("deleted")
        
      } else {
        res.send("User does not exist")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

profile.put('/studentProfile/:id', (req, res) => {

  StudentProfile.findOneAndUpdate({
    // _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.send("updated")
        
      } else { 
        res.send("User does not exist")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

profile.get('/studentProfile/:id', (req, res) => {
  console.log(req)

  StudentProfile.findOne({
    studentname: "yogashree"
  })
    .then(user => {
      if (user) {
        res.json(user)
        
      } else { 
        res.send("User does not exist")
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})





module.exports = profile; 





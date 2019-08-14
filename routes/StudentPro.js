const express = require("express")
const profile = express.Router();
const cors = require("cors")
const StudentProfile = require("../models/StudentProfile")
profile.use(cors())
process.env.SECRET_KEY = 'secret'

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
        StudentProfile.create(userData)
          .then(user => {
            res.json({ status: 'student registered!' })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//seraching by student name
profile.get('/studentProfile', (req, res) => {
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

// get all students deatils
profile.get('/student', (req, res) => {
  StudentProfile.find({

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

// delete by id
profile.delete('/studentProfile', (req, res) => {
  console.log(req.body.id, "delete")
  StudentProfile.findByIdAndDelete({
    _id: req.body.id
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

//edit by id
profile.get('/edit/:id', (req, res) => {
  console.log(req.params, 'hi')
  const id = req.params.id;
  StudentProfile.findById(id, function (err, StudentProfile) {
    res.json(StudentProfile);
  });
});

// update by id
profile.put('/studentProfile/update/:id', (req, res) => {
  console.log(req.body, "update")
  StudentProfile.findOneAndUpdate({
    _id: req.params.id
  },
    {
      studentname: req.body.studentname,
      address: req.body.address,
      email: req.body.email,
      course: req.body.course,
      mobileNumber: req.body.mobileNumber
    })
    .then(user => {
      res.json(req.body)
      // res.send(req.body);
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


//student by name
profile.get('/studentProfile/:id', (req, res) => {
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

// course by particular name
profile.get('/course', (req, res) => {
  StudentProfile.find({
    course: req.query['course']
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
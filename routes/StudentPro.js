const express = require("express")
const profile = express.Router();
const cors = require("cors")

const StudentProfile = require("../models/StudentProfile")
profile.use(cors())


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
profile.get('/studentProfile', (req, res) => {
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
profile.delete('/studentProfile', (req, res) => {
  debugger;
  console.log(req.body.id, "delete")
  StudentProfile.findByIdAndDelete({
    // _id: decoded._id
    _id: req.body.id
    // studentname: req.query['studentname']
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
profile.post('/studentProfile/edit/:id',(req, res) => {
  const id = req.params.id;
  profile.findById(id, function (err, profile){
      res.json(profile);
  });
});

profile.post('/studentProfile/update/:id', (req, res) => {
  console.log(req.body.id, "update")
  StudentProfile.findByIdAndUpdate({
   
    // _id: decoded._id
    _id: req.params.id
  })
    .then(user => {
    
        res.send("updated")
        user.studentname = req.body.studentname;
        user.address = req.body. address;
        user.email = req.body.email;
        user.course = req.body.course;
        user.mobileNumber = req.body.mobileNumber;
    

        user.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

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

profile.get('/course', (req, res) => {
  console.log(req.query['course'])
  StudentProfile.find({
    course:req.query['course']
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





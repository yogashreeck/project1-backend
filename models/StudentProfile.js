const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    studentname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },

});

const StudentProfile = mongoose.model('profile', UserSchema);

module.exports = StudentProfile;
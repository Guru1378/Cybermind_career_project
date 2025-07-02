const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  companyLogo: {
    type: String,
    default: "./public/company_logo.jpeg",
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['FullTime', 'PartTime', 'Internship', 'Contract']
  },
  salary: {
    type: String,
    required: true,
    trim: true
  },
  salaryMin: {
    type: String,
    default: ''
  },
  salaryMax: {
    type: String,
    default: ''
  },
  postedAgo: {
    type: String,
    default: 'Just Now'
  },
  deadline: {
    type: String,
    required: true
  },
  description: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return Array.isArray(arr) && arr.length > 0 && arr.every(str => typeof str === 'string' && str.length >= 5 && str.length <= 500);
      },
      message: 'Each description must be between 5 and 500 characters long.'
    }
  }
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
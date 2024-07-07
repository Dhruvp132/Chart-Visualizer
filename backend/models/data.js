const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  work_year: {
    type: Number,
    required: true
  },
  experience_level: {
    type: String,
    required: true
  },
  employment_type: {
    type: String,
    required: true
  },
  job_title: {
    type: String,
    required: true
  },
  bonus: {
    type: Number,
    required: true
  },
  salary_currency: {
    type: String,
    required: true
  },
  salary_in_usd: {
    type: Number,
    required: true
  },
  employee_residence: {
    type: String,
    required: true
  },
  remote_ratio: {
    type: Number,
    required: true
  },
  company_location: {
    type: String,
    required: true
  },
  company_size: {
    type: String,
    required: true
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

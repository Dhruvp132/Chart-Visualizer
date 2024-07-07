const express = require("express");
const router = express.Router();
const { getSalaries, lineDataGraph, jobTitlesByYear, addJobs } = require('../controllers/dataControllers.js');

router.get('/', getSalaries);
router.get('/linegraph', lineDataGraph);
router.get('/jobtitles', jobTitlesByYear);
router.post('/jobs', addJobs);

module.exports = router;

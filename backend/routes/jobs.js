const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// POST /api/jobs - Create a new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/jobs - Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const fetchJobs = async () => {
  try {
    const response = await axios.get('/api/jobs');
    setJobs(response.data);
    console.log('Fetched jobs:', response.data); // Add this line
  } catch (error) {
    console.error("Error fetching jobs", error);
  }
};

module.exports = router;
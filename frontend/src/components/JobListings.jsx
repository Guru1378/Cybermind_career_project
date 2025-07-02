import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobListings.css';

// Helper function to format posted time
function getPostedAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHrs < 1) return 'Just Now';
  if (diffHrs < 24) return `${diffHrs}h Ago`;
  return `${diffDays}d Ago`;
}

const JobListings = ({ filters }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const fetchJobs = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${API_URL}/api/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  // Filtering logic
  const filteredJobs = jobs.filter(job => {
    const titleMatch = !filters.title || job.title.toLowerCase().includes(filters.title.toLowerCase());
    const locationMatch = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const jobTypeMatch = !filters.jobType || job.jobType === filters.jobType;

    // Salary filter (optional, as before)
    let salaryNum = 0;
    if (job.salary) {
      const match = job.salary.replace(/[^0-9]/g, '');
      salaryNum = parseInt(match, 10) || 0;
    }
    const min = parseInt(filters.salaryMin, 10) || 0;
    const max = parseInt(filters.salaryMax, 10) || Infinity;
    const salaryMatch = salaryNum >= min && salaryNum <= max;

    return titleMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  return (
    <div style={{ padding: 40, background: '#f7f9fb', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'left', marginBottom: 32, marginLeft: 8 }}>Job Listings</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 36,
          justifyItems: 'center',
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        {filteredJobs.length === 0 && <p style={{ gridColumn: '1 / -1' }}>No jobs found</p>}
        {filteredJobs.map(job => (
          <div
            key={job._id}
            style={{
              border: 'none',
              borderRadius: 18,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: 18,
              width: 270,
              minHeight: 380,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 12,
              position: 'relative'
            }}
          >
            {/* Logo and badge */}
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', marginBottom: 24 }}>
              <img
                src={job.companyLogo || '/company_logo.jpeg'}
                alt={job.company}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  objectFit: 'cover',
                  background: '#fff',
                  border: '1px solid #eee',
                  marginRight: 10
                }}
                onError={e => { e.target.onerror = null; e.target.src = '/company_logo.jpeg'; }}
              />
              <div
                style={{
                  marginLeft: 'auto',
                  background: '#eaf3ff',
                  color: '#0099ff',
                  borderRadius: 12,
                  padding: '4px 18px',
                  fontSize: 15,
                  fontWeight: 600
                }}
              >
                {getPostedAgo(job.createdAt)}
              </div>
            </div>
            {/* Title */}
            <h3 style={{
              margin: '0 0 10px 0',
              fontWeight: 700,
              fontSize: 22,
              textAlign: 'left',
              width: '100%'
            }}>{job.title}</h3>
            {/* Info Row */}
            <div style={{
              display: 'flex',
              gap: 18,
              color: '#555',
              fontSize: 16,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span title="Experience" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span role="img" aria-label="exp">👤</span> {job.experience}
              </span>
              <span title="Location" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span role="img" aria-label="loc">🏢</span> {job.location}
              </span>
              <span title="Salary" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span role="img" aria-label="sal">💰</span> {job.salary}
              </span>
            </div>

            {/* Description Headline and Content */}
            <div style={{ width: '100%', margin: '8px 0 0 0' }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 2 }}>
                Description
              </div>
              <div style={{ color: '#444', fontSize: 13, whiteSpace: 'pre-line', marginBottom: 8 }}>
                {(Array.isArray(job.description) ? job.description : [job.description]).map((line, idx) => (
                  <div key={idx} style={{ marginBottom: 2 }}>{line}</div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              style={{
                background: '#0099ff',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 0',
                width: '100%',
                fontWeight: 600,
                fontSize: 18,
                cursor: 'pointer',
                marginTop: 'auto',
                boxShadow: '0 2px 8px rgba(0,153,255,0.10)'
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
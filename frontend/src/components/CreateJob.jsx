import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  title: '',
  company: '',
  companyLogo: '',
  experience: '1-3+ yr',
  location: '',
  jobType: 'FullTime',
  salary: '',
  salaryMin: '',
  salaryMax: '',
  deadline: '',
  description: ''
};

const CreateJob = ({ onClose, onJobCreated }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionLines = formData.description
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length >= 5 && line.length <= 500);

    if (descriptionLines.length === 0) {
      alert('Each description line must be between 5 and 500 characters.');
      return;
    }
    if (!formData.jobType) {
      alert('Please select a job type.');
      return;
    }

    const API_URL = "https://cybermind-career-project-backend-obh3.onrender.com";
    console.log('API_URL:', API_URL);

    try {
      await axios.post(`${API_URL}/api/jobs`, {
        title: formData.title,
        company: formData.company,
        companyLogo: formData.companyLogo,
        experience: formData.experience,
        location: formData.location,
        jobType: formData.jobType,
        salary: `${formData.salary}LPA`,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        postedAgo: "Just Now",
        deadline: formData.deadline,
        description: descriptionLines,
      });
      if (onJobCreated) onJobCreated();
      onClose();
    } catch (error) {
      alert(error?.response?.data?.error || 'Error posting job');
      console.error(error);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: 14,
          minWidth: 480,
          maxWidth: 600,
          width: '98vw',
          padding: '1.8rem 1.8rem 1.2rem 1.8rem',
          boxShadow: '0 4px 16px rgba(111,60,255,0.10), 0 1px 4px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          animation: 'slideDown 0.25s',
        }}
      >
        <h2 style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 14,
          color: '#222',
          textAlign: 'center',
          letterSpacing: 0.01,
        }}>Create Job Opening</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.7rem 1rem',
          marginBottom: 10,
        }}>
          <div>
            <label htmlFor="title" style={labelStyle}>Job Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="company" style={labelStyle}>Company Name</label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Amazon, Microsoft, Swiggy"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="location" style={labelStyle}>Location</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Choose Preferred Location"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="jobType" style={labelStyle}>Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Job Type</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="salaryMin" style={labelStyle}>Salary Range</label>
              <input
                id="salaryMin"
                name="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="₹ 0"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="salaryMax" style={{ ...labelStyle, visibility: 'hidden' }}>to</label>
              <input
                id="salaryMax"
                name="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="₹ 12,00,000"
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label htmlFor="deadline" style={labelStyle}>Application Deadline</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="experience" style={labelStyle}>Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 1-3+ yr"
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="salary" style={labelStyle}>Salary (in LPA)</label>
            <input
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 12"
              required
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="description" style={{ ...labelStyle, fontSize: 13 }}>Job Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Please share a description to let the candidate know more about the job role"
            style={{
              ...inputStyle,
              minHeight: 80,
              fontSize: 13,
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 6,
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#fff',
              color: '#222',
              border: '2px solid #222',
              borderRadius: 8,
              padding: '0.5rem 1.2rem',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Save Draft <span style={{ fontSize: 15 }}>▼</span>
          </button>
          <button
            type="submit"
            style={{
              background: '#0099ff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1.5rem',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,153,255,0.10)',
              transition: 'background 0.2s, transform 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Publish <span style={{ fontSize: 16, marginLeft: 2 }}>»</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const labelStyle = {
  fontWeight: 500,
  marginBottom: 4,
  display: 'block',
  color: '#222',
  fontSize: 13,
  letterSpacing: 0.01,
};

const inputStyle = {
  border: '1.2px solid #e5e7eb',
  borderRadius: 6,
  padding: '0.5rem 0.7rem',
  fontSize: 13,
  background: '#f8fafc',
  outline: 'none',
  marginBottom: 0,
  width: '100%',
  transition: 'border 0.2s, box-shadow 0.2s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};

export default CreateJob;
import React from 'react';

const FilterBar = ({ filters, onChange }) => (
  <div className="filter-bar">
    <input
      name="title"
      value={filters.title}
      onChange={onChange}
      placeholder="Search By Job Title, Role"
    />
    <input
      name="location"
      value={filters.location}
      onChange={onChange}
      placeholder="Preferred Location"
    />
    <select name="jobType" value={filters.jobType} onChange={onChange}>
      <option value="">Job type</option>
      <option value="FullTime">Full Time</option>
      <option value="PartTime">Part Time</option>
      <option value="Internship">Internship</option>
      <option value="Contract">Contract</option>
    </select>
    <span>Salary Per Month</span>
    <input
      type="number"
      name="salaryMin"
      value={filters.salaryMin}
      onChange={onChange}
      placeholder="₹ Min"
      style={{ width: 80 }}
    />
    <span>-</span>
    <input
      type="number"
      name="salaryMax"
      value={filters.salaryMax}
      onChange={onChange}
      placeholder="₹ Max"
      style={{ width: 80 }}
    />
  </div>
);

export default FilterBar;
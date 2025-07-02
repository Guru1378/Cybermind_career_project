import React, { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import JobListings from './components/JobListings';
import CreateJob from './components/CreateJob';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: ''
  });
  const [refresh, setRefresh] = useState(false);

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleJobCreated = () => {
    setRefresh(r => !r);
  };

  return (
    <div>
      <Header onCreateJob={() => setIsModalOpen(true)} />
      <FilterBar filters={filters} onChange={handleFilterChange} />
      {isModalOpen && <CreateJob onClose={() => setIsModalOpen(false)} onJobCreated={handleJobCreated} />}
      <JobListings filters={filters} key={refresh} />
    </div>
  );
}

export default App;

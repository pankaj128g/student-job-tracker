import { useEffect, useState } from 'react';
import axios from 'axios';
import React from "react";



const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: "", role: "", status: "Applied", appliedDate: "", link: "" });

  const fetchJobs = async () => {
    const res = await axios.get(`${backendUrl}/api/jobs`);
    setJobs(res.data);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${backendUrl}/api/jobs`, form);
    setForm({ company: "", role: "", status: "Applied", appliedDate: "", link: "" });
    fetchJobs();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${backendUrl}/api/jobs/${id}`);
    fetchJobs();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await axios.put(`${backendUrl}/api/jobs/${id}`, { status: newStatus });
    fetchJobs();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Job Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
        <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input type="date" value={form.appliedDate} onChange={e => setForm({ ...form, appliedDate: e.target.value })} />
        <input placeholder="Link" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
        <button type="submit">Add Job</button>
      </form>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <strong>{job.company}</strong> - {job.role} - {job.status} - {job.appliedDate}
            <button onClick={() => handleDelete(job._id)}>Delete</button>
            <select value={job.status} onChange={e => handleStatusUpdate(job._id, e.target.value)}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import { useState, useEffect } from "react";
import API from "../services/api";
import "./Dashboard.css";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
  });

  // 🔹 Fetch recruiter jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/my");
      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Create job
  const createJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/jobs", {
        ...form,
        requiredSkills: ["general"],
      });

      setForm({ title: "", description: "", city: "" });
      setShowForm(false);
      fetchJobs();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch applicants for a job
  const fetchApplicants = async (jobId) => {
    try {
      const res = await API.get(`/jobs/${jobId}/applications`);
      setApplications(res.data);
      setSelectedJobId(jobId);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Accept worker
  const acceptWorker = async (jobId, workerId) => {
    try {
      await API.post("/jobs/accept", { jobId, workerId });
      setApplications([]);
      setSelectedJobId(null);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Recruiter Dashboard</h1>
            <p>Manage your job postings and review applications</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Post New Job"}
          </button>
        </div>

        {/* Create Job Form */}
        {showForm && (
          <div className="card create-job-card">
            <div className="card-header">
              <h3>Post a New Job</h3>
            </div>
            <form onSubmit={createJob}>
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  id="title"
                  placeholder="e.g., Senior React Developer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Job Description</label>
                <textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="city">Location</label>
                <input
                  id="city"
                  placeholder="e.g., San Francisco, CA"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary btn-block" disabled={loading}>
                {loading ? "Posting..." : "Post Job"}
              </button>
            </form>
          </div>
        )}

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{jobs.length}</span>
            <span className="stat-label">Total Jobs</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {jobs.filter((j) => j.status === "open").length}
            </span>
            <span className="stat-label">Open Positions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {jobs.filter((j) => j.status === "hired").length}
            </span>
            <span className="stat-label">Filled</span>
          </div>
        </div>

        {/* Jobs List */}
        <div className="jobs-section">
          <h2>Your Job Postings</h2>

          {jobs.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <h3>No jobs posted yet</h3>
              <p>Create your first job posting to start hiring</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div className="job-card" key={job._id}>
                  <div className="job-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p className="job-city">📍 {job.city}</p>
                    </div>
                    <span className={`badge status-${job.status}`}>
                      {job.status === "open" ? "Open" : "Filled"}
                    </span>
                  </div>

                  <p className="job-description">{job.description}</p>

                  <div className="job-footer">
                    {job.status === "open" && (
                      <button
                        onClick={() => fetchApplicants(job._id)}
                        className="btn-primary btn-small"
                      >
                        View Applicants
                      </button>
                    )}
                    {job.status === "hired" && (
                      <span className="status-badge status-hired">✓ Position Filled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applicants Section */}
        {selectedJobId && (
          <div className="applicants-section">
            <div className="section-header">
              <h2>Applicants</h2>
              <button className="btn-secondary btn-small" onClick={() => setSelectedJobId(null)}>
                Close
              </button>
            </div>

            {applications.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">👥</span>
                <h3>No applicants yet</h3>
                <p>Applications will appear here as workers apply</p>
              </div>
            ) : (
              <div className="applicants-list">
                {applications.map((app) => (
                  <div className="applicant-card" key={app._id}>
                    <div className="applicant-header">
                      <div className="applicant-avatar">
                        {app.workerId.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="applicant-info">
                        <h4>{app.workerId.name}</h4>
                        <p className="applicant-email">{app.workerId.email}</p>
                        <p className="applicant-city">📍 {app.workerId.city}</p>
                      </div>
                    </div>

                    <div className="applicant-footer">
                      <button
                        onClick={() => acceptWorker(app.jobId, app.workerId._id)}
                        className="btn-success btn-small"
                      >
                        Hire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
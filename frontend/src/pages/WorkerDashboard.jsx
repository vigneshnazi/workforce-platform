import { useState, useEffect } from "react";
import API from "../services/api";
import "./Dashboard.css";

function WorkerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Dashboard mounted");
    
    // Load from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      console.log("Loaded applied jobs:", stored);
      setAppliedJobs(stored);
    } catch (e) {
      console.error("Error loading from localStorage:", e);
    }
    
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs...");
      setLoading(true);
      
      const response = await API.get("/jobs");
      console.log("Jobs response:", response.data);
      
      const jobsData = response.data.jobs || response.data;
      setJobs(jobsData);
      setError("");
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    try {
      console.log("Applying for job:", jobId);
      
      const response = await API.post("/jobs/apply", { jobId });
      console.log("Apply response:", response.data);
      
      if (response.data.success) {
        // Save to localStorage
        const applied = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
        if (!applied.includes(jobId)) {
          applied.push(jobId);
          localStorage.setItem("appliedJobs", JSON.stringify(applied));
        }
        
        setAppliedJobs([...appliedJobs, jobId]);
        alert("Applied successfully!");
      }
    } catch (error) {
      console.error("Apply error:", error);
      alert(error.response?.data?.message || "Failed to apply for job");
    }
  };

  console.log("Rendering dashboard. Loading:", loading, "Jobs:", jobs.length);

  // Show loading state
  if (loading) {
    return <div className="dashboard-wrapper"><p>Loading jobs...</p></div>;
  }

  // Show error state
  if (error) {
    return <div className="dashboard-wrapper"><p className="error">{error}</p></div>;
  }

  // Show empty state
  if (!jobs || jobs.length === 0) {
    return <div className="dashboard-wrapper"><p>No jobs available</p></div>;
  }

  // Show jobs
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>Available Jobs</h2>
        <p>Applied to {appliedJobs.length} jobs</p>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className="badge">OPEN</span>
            </div>

            <div className="job-body">
              <p className="job-description">{job.description}</p>
              
              <div className="job-city">
                📍 {job.city}
              </div>

              {job.requiredSkills && job.requiredSkills.length > 0 && (
                <div className="skills-section">
                  <strong>Required Skills:</strong>
                  <div className="skills-list">
                    {job.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="job-footer">
              <button
                onClick={() => applyJob(job._id)}
                disabled={appliedJobs.includes(job._id) || job.status !== "open"}
                className={`btn-primary btn-small ${
                  appliedJobs.includes(job._id) ? "btn-applied" : ""
                }`}
              >
                {appliedJobs.includes(job._id) ? "✓ Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkerDashboard;
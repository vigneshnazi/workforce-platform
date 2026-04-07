const Job = require("../models/Job");
const Application = require("../models/Application");

const createJob = async (req, res) => {
    try {
        const {title, description, requiredSkills, city} = req.body;

        const job = await Job.create ({
            recruiterId: req.user.id,
            title,
            description,
            requiredSkills,
            city,
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

// applying to a job
const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        const application = await Application.create({
            jobId,
            workerId: req.user.id,
        });
         res.status(201).json({
            success: true,
            message: "Applied successfully",
            application
        });
    } catch (error) {
        if (error.code ===11000) {
            return res.status(400).json({message: "Already applied to this job"});
        }
        res.status(500).json({message: error.message});
    }
};

// Job application
const getApplications = async (req, res) => {
    try {
        const { jobId } = req.params;

        const applications = await Application.find({ jobId }) 
            .populate("workerId", "name email city");

        res.json(applications);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Accepting worker
const acceptWorker = async (req,res) => {
    try {
        const { jobId, workerId } = req.body;

        // 1. Find job and ensure it's still open
        const job = await Job.findOne({_id: jobId, status: "open"});

        if (!Job) {
            return res.status(400).json({ message: "Job already hired or not found" });
        }

        // 2. Update job 
        job.status = "hired";
        job.hiredWorkerId = workerId;
        await job.save();

        // 3. Accept selected worker
        await Application.findOneAndUpdate(
            {jobId, workerId},
            {status: "accepted"},
        );

        // 4. Reject others
        await Application.updateMany(
            { jobId, workerId: { $ne: workerId} },
            { status: "rejected"},
        );

        res.json({ message: "Worker hired successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Finding jobs (worker)
const getJobs = async (req, res) => {
  const jobs = await Job.find({ status: "open" });
  res.json(jobs);
};

// My Jobs (recruiter)
const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.user.id });
  res.json(jobs);
};

// Job Completion

const completeJob = async (req, res) => {
    try {
        const {jobId} = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }

        job.status = "completed";
        await job.save();

        res.json({message: "Job marked as completed"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createJob, applyToJob, getApplications, getJobs, getMyJobs, acceptWorker, completeJob};
const express = require("express");
const router = express.Router();
const {createJob, applyToJob, getApplications, acceptWorker, completeJob, getJobs, getMyJobs} = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createJob);
router.post("/apply", protect, applyToJob);
router.get("/:jobId/applications", protect, getApplications);
router.post("/accept", protect, acceptWorker);
router.post("/complete", protect, completeJob);
router.get("/", protect, getJobs);
router.get("/my", protect, getMyJobs);
module.exports = router;


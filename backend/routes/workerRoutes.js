const express = require("express");
const router = express.Router();
const { createWorkerProfile } = require("../controllers/workerController");
const protect = require("../middleware/authMiddleware");

router.post("/profile", protect, createWorkerProfile);

module.exports = router;
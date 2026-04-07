require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const workerRoutes = require("./routes/workerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const reviewRoutes = require("./routes/reviewRoutes");


// Create app
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

// use routes
app.get("/", (req, res) => {
  res.send("API is running");
});

// worker routes
app.use("/api/worker", workerRoutes);

// job routes
app.use("/api/jobs", jobRoutes);

// review routes
app.use("/api/reviews", reviewRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


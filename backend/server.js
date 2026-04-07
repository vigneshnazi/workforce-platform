require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Create app
const app = express();

// Connect DB
connectDB();

// CORS Configuration (MUST be before routes)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://workforce-platform-theta.vercel.app"
  ],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reviews", reviewRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
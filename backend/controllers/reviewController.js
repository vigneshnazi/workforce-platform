const Review = require("../models/Review");
const Job = require("../models/Job");
const User = require("../models/User");

const addReview = async (req, res) => {
  try {
    const { jobId, receiverId, rating, comment } = req.body;

    // 1. Check job
    const job = await Job.findById(jobId);
    if (!job || job.status !== "completed") {
      return res.status(400).json({ message: "Job not completed" });
    }

    // 2. Prevent invalid users
    if (
      req.user.id !== job.recruiterId.toString() &&
      req.user.id !== job.hiredWorkerId.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 3. Create review
    const review = await Review.create({
      jobId,
      reviewerId: req.user.id,
      receiverId,
      rating,
      comment,
    });

    // 4. Update receiver rating
    const user = await User.findById(receiverId);

    const newTotal = user.totalReviews + 1;
    const newAverage =
      (user.averageRating * user.totalReviews + rating) / newTotal;

    user.totalReviews = newTotal;
    user.averageRating = newAverage;

    await user.save();

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already reviewed" });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview };
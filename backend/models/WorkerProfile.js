const mongoose = require ("mongoose");

const workerProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        skills: [
            {
                type: String,
            },
        ],
        experienceYears: {
            type: Number,
            default: 0,
        },
        availability: {
            type: Boolean,
            default: true,
        },
        bio: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);
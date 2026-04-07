const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        recruiterId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        requiredSkills: [
            {
                type: String,
            },
        ],
        city: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["open", "hired", "completed"],
            default: "open",
        },
        hiredWorkerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
   { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

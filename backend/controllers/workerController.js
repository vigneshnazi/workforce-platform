const WorkerProfile = require("../models/WorkerProfile");

const createWorkerProfile =async(req, res) => {
    try {
        const {skills, experienceYears, bio} = req.body;

        const profileExist = await WorkerProfile.findOne({ userId: req.user.id});
        
        if (profileExist) {
            return res.status(400).json({message: "Profile already exist"});
        }

        const profile = await WorkerProfile.create ({
            userId: req.user.id,
            skills,
            experienceYears,
            bio,
        });
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

module.exports = {createWorkerProfile};
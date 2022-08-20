const Job = require("../models/job");

exports.getJobById = (req, res, next, id) => {
    Job.findById(id).exec((err, job) => {
        if (err || !job) {
            return res.status(400).json({
                error: "job was not found"
            })
        }
        req.info = job;
        console.log(req.info);
        next();
    })
}

exports.createJob = (req, res) => {
    console.log("hi");
    const job = new Job(req.body);
    job.save((err, job) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your job in db"
            })
        }
        res.json(job);
    })
}

exports.getAllJobs = (req, res) => {
    Job.find().exec((err, jobs) => {
        if (err || !jobs) {
            return res.status(400).json({
                error: "jobs were not found"
            })
        }
        res.json(jobs);
    })
}

exports.updateJob = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.info._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, job) => {
            if (err || !job) {
                return res.status(400).json({
                    error: "job was not able to update"
                })
            }
            res.json(job);
        }
    )
}

exports.getJob = (req, res) => {
    return res.json(req.info);
}

exports.deleteJob = (req, res) => {
    const job = req.info;
    job.remove((err, x) => {
        if (err) {
            return res.status(400).json({
                error: "failed to delete job"
            });
        }
        res.json({ message: "deleted successfully" });
    })


};
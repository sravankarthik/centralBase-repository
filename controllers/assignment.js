const Assignment = require("../models/assignment");
const User = require("../models/user");
const Job = require("../models/job");

exports.getAssignmentById = (req, res, next, id) => {
    Assignment.findById(id).exec((err, assignment) => {
        if (err || !assignment) {
            return res.status(400).json({
                error: "assignemnt was not found"
            })
        }
        req.assignment = assignment;
        next();
    })
}

exports.getAssignment = (req, res) => {
    return res.json(req.assignment);
}

exports.createAssignment = (req, res) => {
    const assignment = new Assignment(req.body);
    assignment.save((err, assignment) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your assignment in db"
            })
        }
        console.log(assignment.user);
        User.findByIdAndUpdate(
            { _id: assignment.user._id },
            { $push: { assignments: assignment } },
            { new: true, useFindAndModify: false },
            (err, assignment) => {
                if (err || !assignment) {
                    return res.status(400).json({
                        error: "user was not able to update"
                    })
                }
                console.log("done");
            }
        )
        Job.findByIdAndUpdate(
            { _id: assignment.job._id },
            { $push: { assignments: assignment } },
            { new: true, useFindAndModify: false },
            (err, assignment) => {
                if (err || !assignment) {
                    return res.status(400).json({
                        error: "user was not able to update"
                    })
                }
                console.log("done");
            }
        )
        res.json(assignment);
    })
}

exports.createCheckboxes = (req, res, next) => {
    req.body.job = req.info;
    // console.log(req.body.job, "hi", req.profile);
    req.body.user = req.profile;
    const arr = req.profile.subdivisions;
    const n = arr.length;
    req.body.checkboxes = new Array(n);
    for (let i = 0; i < n; ++i) req.body.checkboxes[i] = false;
    console.log(req.body);
    next();
}

exports.getAllAssignments = (req, res) => {
    Assignment.find().exec((err, assignment) => {
        if (err || !assignment) {
            return res.status(400).json({
                error: "assignment were not found"
            })
        }
        res.json(assignment);
    })
}

exports.updateAssignment = (req, res) => {
    Assignment.findByIdAndUpdate(
        { _id: req.assignment._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, assignment) => {
            if (err || !assignment) {
                return res.status(400).json({
                    error: "assignment was not able to update"
                })
            }
            res.json(assignment);
        }
    )
}

exports.getAssignment = (req, res) => {
    return res.json(req.assignment);
}

exports.deleteAssignemnt = (req, res) => {
    const assignment = req.assignment;
    assignment.remove((err, x) => {
        if (err) {
            return res.status(400).json({
                error: "failed to delete assignemnt"
            });
        }
        res.json({ message: "deleted successfully" });
    })

};

exports.createComment = (req, res, next) => {
    req.body.tempComment = {};
    req.body.tempComment.user = req.profile;
    req.body.tempComment.comment = req.body.comment;
    console.log(req.body.tempComment);
    next();
};

exports.pushComment = (req, res) => {
    Assignment.findByIdAndUpdate(
        { _id: req.assignment._id },
        { $push: { comments: req.body.tempComment } },
        { new: true, useFindAndModify: false },
        (err, assignment) => {
            if (err || !assignment) {
                return res.status(400).json({
                    error: "assignment was not able to update"
                })
            }
            console.log(assignment.comments[0].comment);
            res.json(assignment);
        }
    )
};

exports.getAllComments = (req, res) => {
    res.json(req.assignment.comments);
};
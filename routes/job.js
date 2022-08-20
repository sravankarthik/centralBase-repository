const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUsers, updateUser } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getJob, updateJob, deleteJob, getAllJobs, createJob, getJobById } = require("../controllers/job");

router.param("jobId", getJobById);
router.param("userId", getUserById);


router.get("/job/:jobId", getJob);
router.post("/job/:userId", isSignedIn, isAdmin, createJob);
router.put("/job/:jobId/:userId", isSignedIn, isAdmin, updateJob);
router.delete("/job/:jobId/:userId", isSignedIn, isAdmin, deleteJob);
router.get("/jobs", getAllJobs);



module.exports = router;
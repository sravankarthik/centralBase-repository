const express = require("express");
const router = express.Router();

const { getAssignment, createAssignment, createCheckboxes, getAssignmentById, getAllAssignments, updateAssignment, deleteAssignemnt, createComment, pushComment, getAllComments } = require("../controllers/assignment");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getJobById } = require("../controllers/job");
const { getUserById } = require("../controllers/user");


router.param("userId", getUserById);
router.param("assignmentId", getAssignmentById);
router.param("jobId", getJobById);

router.get("/assignment/:assignmentId/:userId", getAssignment);
router.put("/assignment/:assignmentId/:userId", updateAssignment);
router.delete("/assignment/:assignmentId/:userId", deleteAssignemnt);
router.post("/assignment/:assignmentId/comment/:userId", createComment, pushComment);
router.get("/assignment/:assignmentId/comments/:userId", getAllComments);
router.post("/assignment/create/:jobId/:userId", createCheckboxes, createAssignment);
router.get("/assignments/:userId", getAllAssignments);



module.exports = router;
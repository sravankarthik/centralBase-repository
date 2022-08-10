const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["cancelled", "ongoing", "completed"]
    },
    new_comment: {
        type: Boolean
    }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
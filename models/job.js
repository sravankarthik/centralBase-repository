const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    job_id: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["cancelled", "ongoing", "completed"]
    }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
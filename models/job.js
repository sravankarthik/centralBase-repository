const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
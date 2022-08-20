const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const assignmentSchema = new Schema({
    job: {
        type: ObjectId,
        ref: "Job"
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["cancelled", "ongoing", "completed"],
        default: "ongoing"
    },
    checkboxes: [{
        type: Boolean,
        default: false
    }],
    comments: [{
        user: {
            type: ObjectId,
            ref: "User"
        },
        comment: {
            type: String
        },
        time: {
            type: Date,
            default: Date.now()
        }
    }]
});

module.exports = mongoose.model("assignment", assignmentSchema);

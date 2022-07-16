const mongoose = require("mongoose");
const crypto = require("crypto")
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = Schema;


const jobListSchema = new Schema({
    job: {
        type: ObjectId,
        ref: "Job"
    }
});

const JobList = mongoose.model("jobList", jobListSchema);

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    encry_password: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    jobsPending: [jobListSchema],
    jobsComplete: [jobListSchema]
}, { timestamps: true });

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.secretPassword(password);
    })
    .get(function () {
        return this._password;
    })

userSchema.methods = {
    authenticator: function (plainPassword) {
        return this.secretPassword(plainPassword) == this.encry_password;
    },
    secretPassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        }
        catch (err) {
            return "";
        }
    }
};

const User = mongoose.model("User", userSchema);

module.exports = { User, JobList };
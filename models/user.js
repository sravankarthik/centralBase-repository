const mongoose = require("mongoose");
const crypto = require("crypto")
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1")

let userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    encry_password: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
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

module.exports = mongoose.model("User", userSchema);
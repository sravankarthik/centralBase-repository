const { User } = require("../models/user");


exports.signout = (req, res) => {
    res.json({
        message: ""
    });
};

exports.signup = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "not able to save user in DB"
            })
        }
        res.json(user);
    });
};
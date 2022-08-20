const User = require("../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "signOut successful"
    });
};

exports.signup = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save((err, user) => {
        console.log(err);
        if (err) {
            return res.status(400).json({
                err: "not able to save user in DB"
            })
        }
        res.json(user);
    });
};

exports.signin = (req, res) => {
    let { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "not able to save user in DB"
            })
        }
        if (!user.authenticator(password)) {
            return res.status(401).json({
                error: "username and password do not match"
            })
        }
        const token = jwt.sign({ _id: user._id }, "random");
        res.cookie("token", token, { expire: new Date() + 9999 });

        return res.json({ token, user });
    });
}

exports.isSignedIn = expressJwt({
    secret: "random",
    userProperty: "auth"
});

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "not authenticated"
        });
    };
    next();
};

exports.isAdmin = (req, res, next) => {
    console.log(req.profile);
    if (req.profile.role != 0) {
        return res.status(403).json({
            error: "you are not admin"
        })
    };
    next();
};

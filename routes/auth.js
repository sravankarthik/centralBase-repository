let express = require("express");
let router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup", signup);
router.get("/signout", signout);
router.post("/signin", signin);

router.get("/test", isSignedIn, (req, res) => {
    res.send("done");
})


module.exports = router;

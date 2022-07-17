let express = require("express");
let router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup", signup);
router.get("/signout", signout);
router.post("/signin", signin);

module.exports = router;

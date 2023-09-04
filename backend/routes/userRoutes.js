const { signupUser, authUser } = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.route("/").post(signupUser);
router.post("/signin", authUser);

module.exports = router;

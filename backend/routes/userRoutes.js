const {
  signupUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.route("/").post(signupUser).get(protect, allUsers);

router.post("/signin", authUser);

module.exports = router;

const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getRobotResponse } = require("../controllers/robotController");
const router = express.Router();

router.route("/suggest").post(protect, getRobotResponse);

module.exports = router;

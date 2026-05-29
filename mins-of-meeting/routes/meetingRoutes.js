const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  generateMeetingSummary,
  getMeetings,
} = require("../controllers/meetingController");

router.post(
  "/generate",
  upload.single("audio"),
  generateMeetingSummary
);

router.get("/", getMeetings);

module.exports = router;
const Meeting = require("../models/Meeting");
const speechToText = require("../services/speechService");
const generateMoM = require("../services/aiService");

const cleanTranscript = (text) => {
  return text
    .replace(/\b(\w+)( \1)+\b/gi, "$1") // removes repeated words
    .replace(/\s+/g, " ")
    .trim();
};

const generateMeetingSummary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Audio file required",
      });
    }

    console.log("Uploaded File:", req.file.path);

    // 1️⃣ AUDIO -> TEXT
    const rawTranscript = await speechToText(req.file.path);

    const transcript = cleanTranscript(rawTranscript);

    console.log("Clean Transcript:", transcript);

    if (!transcript || transcript.length < 5) {
      return res.status(400).json({
        success: false,
        error: "Transcript too short or empty",
      });
    }

    // 2️⃣ TEXT -> AI SUMMARY
    const momData = await generateMoM(transcript);

    // 3️⃣ SAVE TO DB
    const savedMeeting = await Meeting.create({
      transcript,
      ...momData,
    });

    return res.status(201).json({
      success: true,
      data: savedMeeting,
    });

  } catch (error) {
    console.log("Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: meetings,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateMeetingSummary,
  getMeetings,
};
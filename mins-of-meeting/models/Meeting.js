const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    transcript: {
      type: String,
    },

    meeting_summary: {
      type: String,
    },

    key_points: [
      {
        type: String,
      },
    ],

    decisions: [
      {
        type: String,
      },
    ],

    action_items: [
      {
        task: String,
        assigned_to: String,
        deadline: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);
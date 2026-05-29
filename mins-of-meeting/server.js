require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db");
const meetingRoutes = require("./routes/meetingRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/meetings", meetingRoutes);

app.get("/", (req, res) => {
  res.send("MoM Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

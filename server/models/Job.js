const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"] },
  appliedDate: String,
  link: String
});

module.exports = mongoose.model("Job", JobSchema);
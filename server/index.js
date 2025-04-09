require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Job = require("./models/Job");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find().sort({ appliedDate: -1 });
  res.json(jobs);
});

app.post("/api/jobs", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

app.put("/api/jobs/:id", async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/api/jobs/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ✅ Only start the server after MongoDB connects
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: false
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
})
.catch((err) => console.error("❌ MongoDB connection error:", err));

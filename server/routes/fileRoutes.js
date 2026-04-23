const express = require("express");
const router = express.Router();
const File = require("../models/File");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// UPLOAD FILE
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const file = await File.create({
      userId: req.user.id,
      filename: req.file.filename,
      path: req.file.path,
    });

    res.json(file);
  } catch (err) {
    res.status(500).json("Upload failed");
  }
});

// GET FILES
router.get("/", auth, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.json(files);
  } catch {
    res.status(500).json("Error fetching files");
  }
});

// DOWNLOAD FILE
router.get("/download/:id", auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json("File not found");
    }

    res.download(file.path);
  } catch {
    res.status(500).json("Download error");
  }
});

module.exports = router;
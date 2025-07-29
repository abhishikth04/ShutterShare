const express = require('express');
const { createSpace, joinSpace } = require('../controllers/spaceController');
const authMiddleware = require('../middleware/authMiddleware');
const { parser } = require("../config/cloudinary");
const Space = require("../models/Space");

const router = express.Router();

router.post('/create', authMiddleware, createSpace);
router.post('/join', authMiddleware, joinSpace);

// 🖼 Upload image to Cloudinary
router.post('/:id/upload', authMiddleware, parser.single("image"), async (req, res) => {
  const { id } = req.params;

  try {
    const space = await Space.findById(id);
    if (!space) return res.status(404).json({ message: "Space not found" });

    const image = {
      url: req.file.path,
      filename: req.file.filename,
      uploadedBy: req.user.id,
    };

    space.images.push(image);
    await space.save();

    res.status(200).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;

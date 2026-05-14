const express = require('express');
const { createSpace, joinSpace } = require('../controllers/spaceController');
const authMiddleware = require('../middleware/authMiddleware');
const { parser } = require("../config/cloudinary");
const Space = require("../models/Space");
const mongoose = require("mongoose");

const router = express.Router();

router.post('/create', authMiddleware, createSpace);
router.post('/join', authMiddleware, joinSpace);

// 🖼 Upload image to Cloudinary
router.post('/:id/upload', authMiddleware, parser.single("image"), async (req, res) => {

  const { id } = req.params;

  try {

    const space = await Space.findById(id);

    if (!space) {

      return res.status(404).json({
        message: "Space not found"
      });
    }

    // Prevent uploads to expired spaces
    if (new Date(space.expiresAt) < new Date()) {

      return res.status(410).json({
        message: "Space expired"
      });
    }

    const image = {
      url: req.file.path,
      filename: req.file.filename,
      uploadedBy: req.user.userId,
    };

    space.images.push(image);

    await space.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      image
    });

  } catch (error) {

    console.error("Cloudinary Upload Error:", error);

    res.status(500).json({
      message: "Upload failed"
    });
  }
});

// Get all active spaces of logged-in user
router.get("/my-spaces", authMiddleware, async (req, res) => {

  try {

    const userObjectId = new mongoose.Types.ObjectId(
      req.user.userId
    );

    const spaces = await Space.find({
      members: userObjectId,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    res.status(200).json(spaces);

  } catch (error) {

    console.error("Error fetching spaces:", error);

    res.status(500).json({
      message: "Failed to fetch spaces",
    });
  }
});

// Get space by ID
router.get('/:id', authMiddleware, async (req, res) => {

  try {

    const space = await Space.findById(req.params.id)
      .populate("images.uploadedBy", "name");

    if (!space) {

      return res.status(404).json({
        message: "Space not found"
      });
    }

    // Prevent opening expired spaces
    if (new Date(space.expiresAt) < new Date()) {

      return res.status(410).json({
        message: "Space expired"
      });
    }

    res.json(space);

  } catch (error) {

    console.error("Error fetching space:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;
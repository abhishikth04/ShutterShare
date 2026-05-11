const Space = require("../models/Space");
const mongoose = require("mongoose");

function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const createSpace = async (req, res) => {
  const { name, description, creatorId } = req.body;

  const defaultTimeLimit = 300; // 5 hours in minutes
 const expiresAt = new Date(Date.now() + defaultTimeLimit * 60 * 1000);
  try {
    let publicCode;
    let exists = true;

    while (exists) {
      publicCode = generateCode();
      const check = await Space.findOne({ publicCode });
      if (!check) exists = false;
    }

    const newSpace = new Space({
      name,
      description,
      creator: creatorId,
      members: [creatorId],
      publicCode,
      expiresAt,
    });

    await newSpace.save();
    res.status(201).json({ message: "Space created", space: newSpace });
  } catch (err) {
    res.status(500).json({ message: "Error creating space", error: err.message });
  }
};

const joinSpace = async (req, res) => {

  const { publicCode } = req.body;

  try {

    const space = await Space.findOne({ publicCode });

    if (!space) {

      return res.status(404).json({
        message: "Invalid code",
      });
    }

    const userId = req.user.userId;

    // Check if already joined
    const alreadyMember = space.members.some(
      (member) => String(member) === String(userId)
    );

    if (alreadyMember) {

      return res.status(400).json({
        message: "User already joined",
      });
    }

    // Push proper ObjectId
    space.members.push(
      new mongoose.Types.ObjectId(userId)
    );

    await space.save();

    res.status(200).json({
      message: "Joined space",
      space,
    });

  } catch (err) {

    console.error("❌ Join Space Error:", err);

    res.status(500).json({
      message: "Error joining space",
      error: err.message,
    });
  }
};

const uploadImages = async (req, res) => {
  const { spaceId, userId } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images uploaded" });
  }

  try {
    const space = await Space.findById(spaceId);
    if (!space) return res.status(404).json({ message: "Space not found" });

    if (!space.members.includes(userId)) {
      return res.status(403).json({ message: "User not in this space" });
    }

    const imageEntries = req.files.map(file => ({
      url: file.path,
      filename: file.originalname,
      uploadedBy: userId,
    }));

    space.images.push(...imageEntries);
    await space.save();

    res.status(200).json({ message: "Images uploaded", images: imageEntries });
  } catch (err) {
    console.error("Image Upload Error:", err);
    res.status(500).json({ message: "Error uploading images", error: err.message });
  }
};

module.exports = {
  createSpace,
  joinSpace,
  uploadImages,
};

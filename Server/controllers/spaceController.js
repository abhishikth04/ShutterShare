const Space = require("../models/Space.js");

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
  console.log(req.body);

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
      members: [creatorId],
    });

    await newSpace.save();
    res.status(201).json({ message: "Space created", space: newSpace });
  } catch (err) {
    res.status(500).json({ message: "Error creating space", error: err.message });
  }
};

const joinSpace = async (req, res) => {
  const { publicCode, userId } = req.body;

  try {
    const space = await Space.findOne({ publicCode });

    if (!space) return res.status(404).json({ message: "Invalid code" });

    if (space.members.includes(userId))
      return res.status(400).json({ message: "User already joined" });

    space.members.push(userId);
    await space.save();

    res.status(200).json({ message: "Joined space", space });
  } catch (err) {
    res.status(500).json({ message: "Error joining space", error: err.message });
  }
};

const uploadImage = async (req, res) => {
  const { spaceId, userId } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const space = await Space.findById(spaceId);
    if (!space) return res.status(404).json({ message: "Space not found" });

    if (!space.members.includes(userId)) {
      return res.status(403).json({ message: "User not in this space" });
    }

    const imageEntry = {
      url: `/uploads/${file.filename}`,
      filename: file.originalname,
      uploadedBy: userId,
    };

    space.images.push(imageEntry);
    await space.save();

    res.status(200).json({ message: "Image uploaded", image: imageEntry });
  } catch (err) {
    res.status(500).json({ message: "Error uploading image", error: err.message });
  }
};

module.exports = {
  createSpace,
  joinSpace,
  uploadImage
};

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// 🔧 Configure Cloudinary
cloudinary.config({
  cloud_name: "dujaf1yff",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📤 Upload to Cloudinary and delete local file
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "spaces_uploads",
    });

    fs.unlinkSync(filePath); // cleanup
    return result;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
};

module.exports = { uploadToCloudinary };

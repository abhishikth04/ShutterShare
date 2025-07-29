export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("http://localhost:5000/api/spaces/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url; // return the Cloudinary URL
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

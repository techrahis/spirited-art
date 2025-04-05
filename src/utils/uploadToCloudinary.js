import cloudinary from "../config/cloudinary.js";

// ✅ Upload function
export const uploadToCloudinary = async (imageBuffer, folder) => {
  try {
    // Convert buffer to Base64
    const base64String = `data:image/png;base64,${imageBuffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: folder,
      resource_type: "image",
    });

    return result.secure_url; // Return Cloudinary image URL
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    return null;
  }
};

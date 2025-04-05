import cloudinary from "../config/cloudinary.js";
import fetch from "node-fetch";

export const getBase64ImagesFromCloudinary = async (folderPath) => {
  try {
    if (!cloudinary || !cloudinary.search) {
      throw new Error("Cloudinary is not configured properly.");
    }

    // ✅ Fetch images from Cloudinary and ensure PNG format
    const response = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .max_results(30)
      .execute();

    if (!response?.resources?.length) {
      throw new Error("No images found in Cloudinary.");
    }

    // ✅ Convert images to Base64 with PNG transformation
    const base64Images = await Promise.all(
      response.resources.map(async (resource) => {
        try {
          // ✅ Force PNG format using Cloudinary transformation
          const pngUrl = cloudinary.url(resource.public_id, {
            format: "png", // Convert to PNG
            secure: true, // Ensure HTTPS
          });

          const imageResponse = await fetch(pngUrl);
          if (!imageResponse.ok) {
            throw new Error(
              `Failed to fetch image: ${imageResponse.statusText}`
            );
          }

          const buffer = await imageResponse.arrayBuffer();
          return {
            base64: Buffer.from(buffer).toString("base64"),
            format: "png",
            url: pngUrl,
            public_id: resource.public_id,
            width: resource.width,
            height: resource.height,
          };
        } catch (error) {
          console.error(
            `❌ Error fetching image ${resource.public_id}:`,
            error.message
          );
          return null; // Skip this image if there's an error
        }
      })
    );

    return base64Images.filter((img) => img !== null); // Remove failed fetches
  } catch (error) {
    console.error("❌ Error fetching images from Cloudinary:", error.message);
    throw error;
  }
};

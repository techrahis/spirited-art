import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { getBase64ImagesFromCloudinary } from "../utils/getBase64ImagesFromCloudinary.js";

const ghibliService = async (ctx) => {
  try {
    const tgId = ctx.from.id;
    const photo = ctx.message.photo.pop();
    const fileId = photo.file_id;

    // ✅ Get file link from Telegram
    const fileLink = await ctx.telegram.getFileLink(fileId);
    if (!fileLink) {
      throw new Error("Failed to get file link from Telegram.");
    }

    // ✅ Download the image
    const response = await fetch(fileLink.href);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // ✅ Upload image to Cloudinary
    const uploadedImageUrl = await uploadToCloudinary(
      imageBuffer,
      `SPIRITED-ART-BOT/users/${tgId}/uploads`
    );
    if (!uploadedImageUrl) {
      throw new Error("Cloudinary upload failed.");
    }

    console.log(`✅ Image uploaded to Cloudinary: ${uploadedImageUrl}`);

    // ✅ Fetch reference images dynamically as Base64
    const referenceImages = await getBase64ImagesFromCloudinary(
      "SPIRITED-ART-BOT/references/ghibli"
    );

    // ✅ Ensure Base64 images are passed correctly
    const contents = [
      {
        text: "Use the following reference images to understand the desired Ghibli-style transformation.",
      },
      ...referenceImages.map((image) => ({
        inlineData: {
          mimeType: `image/${image.format}`,
          data: image.base64, // ✅ Use Base64 instead of imageBuffer
        },
      })),
      {
        text:
          "1. Analyze the Image: Identify the main subjects (characters, objects) and observe the background elements, including furniture, lighting, and colors. Ensure the original color palette, shadows, reflections, and textures are maintained. " +
          "2. Ghibli-Style Conversion: Convert the characters into Ghibli-style animation while keeping their facial features, body proportions, age, gender, poses, and colors intact. " +
          "3. Output: Provide the final image in PNG format, maintaining the original resolution and aspect ratio.",
      },
      {
        inlineData: {
          mimeType: "image/png",
          data: imageBuffer.toString("base64"), // ✅ Convert input image to Base64
        },
      },
    ];

    // ✅ Initialize AI model
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

    // ✅ Generate the Ghibli-style image
    const responseAI = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: contents,
      config: { responseModalities: ["Text", "Image"] },
    });

    if (!responseAI?.candidates?.[0]?.content?.parts) {
      throw new Error("AI response is empty or invalid.");
    }

    let generatedImageUrl = null;

    // ✅ Upload AI-generated image to Cloudinary
    for (const part of responseAI.candidates[0].content.parts) {
      if (part.inlineData) {
        const genImageData = Buffer.from(part.inlineData.data, "base64");
        generatedImageUrl = await uploadToCloudinary(
          genImageData,
          `SPIRITED-ART-BOT/users/${tgId}/outputs`
        );
        console.log(
          `✅ Ghibli-style image uploaded to Cloudinary: ${generatedImageUrl}`
        );
      }
    }

    const ghibliResponse = {
      generatedImage: generatedImageUrl,
      givenImage: uploadedImageUrl,
    };

    return ghibliResponse; // Return Cloudinary URL
  } catch (error) {
    console.error("❌ Error in ghibliService:", error);
    return null;
  }
};

export default ghibliService;

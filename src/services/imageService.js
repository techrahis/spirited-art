import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { getBase64ImagesFromCloudinary } from "../utils/getBase64ImagesFromCloudinary.js";
import { prompts } from "../config/prompts.js";

const imageService = async (ctx, userSelection) => {
    try {
        const tgId = ctx.from.id;

        if (!prompts[userSelection]) {
            throw new Error(`Style "${userSelection}" is not supported.`);
        }

        const promptText = prompts[userSelection].promptText;
        const referenceFolder = prompts[userSelection].referenceFolder;

        if (!ctx.message?.photo?.length) {
            throw new Error("No photo found in the message.");
        }

        const photo = ctx.message.photo.pop();
        const fileId = photo.file_id;

        console.log(`🎨 Processing image in ${userSelection} style for user ${tgId}`);

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
        const referenceImages = await getBase64ImagesFromCloudinary(referenceFolder);

        // ✅ Prepare AI prompt
        const contents = [
            {
                text: `Use the following reference images to understand the desired ${userSelection}-style transformation.`,
            },
            ...referenceImages.map((image) => ({
                inlineData: {
                    mimeType: `image/${image.format || "png"}`,
                    data: image.base64,
                },
            })),
            {
                text: promptText,
            },
            {
                inlineData: {
                    mimeType: "image/png",
                    data: imageBuffer.toString("base64"),
                },
            },
        ];

        // ✅ Initialize AI model
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

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
                console.log(`✅ ${userSelection}-style image uploaded to Cloudinary: ${generatedImageUrl}`);
            }
        }

        return {
            generatedImage: generatedImageUrl,
            givenImage: uploadedImageUrl,
        };
    } catch (error) {
        console.error("❌ Error in imageService:", error.message);
        return null;
    }
};

export default imageService;

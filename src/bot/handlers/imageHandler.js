import redis from "../../config/redis.js";
import ghibliService from "../../services/ghibliService.js";
import { GeneratedImage } from "../../database/models/index.js";

async function imageHandler(ctx) {
  // User can generate 3 images in 3 hours validation
  const userKey = `user:${ctx.from.id}:imageCount`;
  const imageCount = await redis.get(userKey);
  if (imageCount >= 3) {
    ctx.reply(
      "⚠️ You have reached the limit of 3 images in 3 hours. Please try again later."
    );
    return;
  }

  // User selection validation
  const userSelection = await redis.get(`user:${ctx.from.id}:selectedStyle`);
  if (!userSelection) {
    ctx.reply("⚠️ Please select a style first before sending an image!");
    return;
  } else {
    ctx.reply(`📷 Image received! Processing in *${userSelection} STYLE...*`, {
      parse_mode: "Markdown",
    });
  }

  if (userSelection === "GHIBLI") {
    const ghibliResponse = await ghibliService(ctx);
    if (ghibliResponse) {
      await storeImageCount(ctx); // Store count of generated images in Redis
      await storeImage(ctx, ghibliResponse, userSelection); // Store user given images and generated images in database
      ctx.replyWithPhoto(ghibliResponse.generatedImage, {
        caption: "✨ Your GHIBLI artwork!",
      });
    } else {
      ctx.reply("❌ Something went wrong on our end. Please try again later.", {
        parse_mode: "Markdown",
      });
    }
  } else {
    ctx.reply("❌ Currently, only Ghibli style is supported.");
  }
}

// Function to store the count of generated images in Redis
async function storeImageCount(ctx) {
  try {
    const userKey = `user:${ctx.from.id}:imageCount`;
    const currentCount = (await redis.get(userKey)) || 0;
    await redis.set(userKey, parseInt(currentCount) + 1, "EX", 10800); // 3 hours
  } catch (err) {
    console.error("❌ Failed to update image count in Redis:", err);
    ctx.reply("❌ Something went wrong on our end. Please try again later.", {
      parse_mode: "Markdown",
    });
  }
}

// Function to store the generated image and user details in the database
async function storeImage(ctx, ghibliResponse, userSelection) {
  try {
    await GeneratedImage.create({
      userId: ctx.from.id.toString(),
      givenImage: ghibliResponse.givenImage,
      generatedImage: ghibliResponse.generatedImage,
      style: userSelection,
    });
  } catch (err) {
    console.error("❌ Failed to store image in database:", err);
    ctx.reply("❌ Something went wrong on our end. Please try again later.", {
      parse_mode: "Markdown",
    });
  }
}

export default imageHandler;

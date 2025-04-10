import { GeneratedImage } from "../../database/models/index.js";

async function generatedHandler(ctx) {
  try {
    await ctx.answerCbQuery();

    const userId = ctx.from.id.toString();
    const offset = 0; // start with the most recent 3 images
    const limit = 3;

    const images = await GeneratedImage.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });

    if (!images || images.length === 0) {
      return ctx.reply("⚠️ You have no generated images. Please generate an image first!");
    }

    // Send image carousel
    for (const image of images) {
      await ctx.replyWithPhoto(image.generatedImage, {
        caption: `🖼️ Style: *${image.style}*\n🕒 Created at: ${image.createdAt.toLocaleString()}`,
        parse_mode: "Markdown",
      });
    }

    // Add navigation buttons
    const totalImages = await GeneratedImage.count({ where: { userId } });

    if (totalImages > limit) {
      await ctx.reply("📂 Navigate your artworks:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "➡️ Next", callback_data: `gallery:${offset + limit}` },
            ],
          ],
        },
      });
    }

  } catch (err) {
    console.error("❌ Failed to retrieve generated images:", err);
    ctx.reply("❌ Something went wrong on our end. Please try again later.");
  }
}

export default generatedHandler;

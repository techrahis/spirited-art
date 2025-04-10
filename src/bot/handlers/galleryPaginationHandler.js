import { GeneratedImage } from "../../database/models/index.js";

async function galleryPaginationHandler(ctx) {
    try {
        await ctx.answerCbQuery();

        const userId = ctx.from.id.toString();
        const callbackData = ctx.callbackQuery.data;
        const offset = parseInt(callbackData.split(":")[1]) || 0;
        const limit = 3;

        const totalImages = await GeneratedImage.count({ where: { userId } });

        const images = await GeneratedImage.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
            offset,
            limit,
        });

        if (!images || images.length === 0) {
            return ctx.reply("⚠️ No more images to display.");
        }

        for (const image of images) {
            await ctx.replyWithPhoto(image.generatedImage, {
                caption: `🖼️ Style: *${image.style}*\n🕒 Created at: ${image.createdAt.toLocaleString()}`,
                parse_mode: "Markdown",
            });
        }

        const hasPrev = offset - limit >= 0;
        const hasNext = offset + limit < totalImages;

        const buttons = [];
        if (hasPrev) {
            buttons.push({ text: "⬅️ Previous", callback_data: `gallery:${offset - limit}` });
        }
        if (hasNext) {
            buttons.push({ text: "➡️ Next", callback_data: `gallery:${offset + limit}` });
        }

        await ctx.reply("📂 Navigate your artworks:", {
            reply_markup: {
                inline_keyboard: [buttons],
            },
        });

    } catch (err) {
        console.error("❌ Gallery pagination error:", err);
        ctx.reply("❌ Failed to load images. Please try again later.");
    }
}

export default galleryPaginationHandler;

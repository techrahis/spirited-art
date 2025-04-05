import redis from "../../config/redis.js";

async function styleHandler(ctx, styleKey) {
  try {
    ctx.answerCbQuery();
    await redis.set(`user:${ctx.from.id}:selectedStyle`, styleKey);
    ctx.reply(
      `🎨 You selected *${styleKey} STYLE*! Now send an image to transform it.`,
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    console.error("Error in handleStyleSelection:", error);
    ctx.reply(
      "❌ Oops! Something went wrong while saving your style. Try again."
    );
  }
}

export default styleHandler;

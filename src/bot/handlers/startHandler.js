import redis from "../../config/redis.js";
import { Markup } from "telegraf";
import { User } from "../../database/models/index.js";

async function startHandler(ctx) {
  await redis.set(`user:${ctx.from.id}:selectedStyle`, null); // Clear any previous style selection

  const userExists = await User.findOne({
    where: { userId: ctx.from.id.toString() },
  });
  if (!userExists) {
    await User.create({
      userId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    });
  }

  ctx.reply(
    "🎨 *Welcome to SPIRITED ART BOT!* ✨\n\n" +
      "I can transform your images into unique artistic styles! Choose an option below:",
    {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("🌸 Ghibli Style", "GHIBLI"),
          Markup.button.callback("🖌️ Anime Style", "ANIME"),
        ],
        [
          Markup.button.callback("🌆 Cyberpunk Anime", "CYBERPUNK"),
          Markup.button.callback("🎭 Cartoonize", "CARTOON"),
        ],
        [
          Markup.button.callback("🏯 Samurai Anime", "SAMURAI"),
          Markup.button.callback("🏎️ Retro 90s Anime", "RETRO"),
        ],
        [Markup.button.callback("📂 My Generated Images", "GENERATED")],
        [Markup.button.callback("❓ About", "ABOUT")],
      ]),
    }
  );
}

export default startHandler;

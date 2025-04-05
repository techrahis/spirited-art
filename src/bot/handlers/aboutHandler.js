function aboutHandler(ctx) {
  ctx.answerCbQuery();
  ctx.reply(
    "ℹ️ *About SPIRITED ART BOT:*\n\n" +
      "🎨 *Transform your images* into breathtaking artistic styles like *Ghibli, Anime, Cyberpunk, Cartoon*, and more!\n" +
      "🖼️ *View past generated images* anytime in the Gallery.\n\n" +
      "*How to Use:*\n" +
      "1️⃣ *Choose a style* from the menu.\n" +
      "2️⃣ *Upload an image* 📷\n" +
      "3️⃣ *Let the AI work its magic!* ✨\n" +
      "4️⃣ *Receive your transformed artwork* and save or share it!\n\n" +
      "🚀 *More styles and features coming soon!* Stay creative! 🎭✨",
    { parse_mode: "Markdown" }
  );
}

export default aboutHandler;

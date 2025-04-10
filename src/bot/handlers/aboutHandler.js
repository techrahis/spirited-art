function aboutHandler(ctx) {
  ctx.answerCbQuery();
  ctx.reply(
      "ℹ️ *About SPIRITED ART BOT:*\n\n" +
      "🎨 *Transform your images* into breathtaking artistic styles like *Ghibli, Anime, Cyberpunk, Cartoon*, and more!\n" +
      "🖼️ *View your past creations* anytime in the Gallery.\n\n" +
      "*How to Use:*\n" +
      "1️⃣ *Choose a style* from the menu\n" +
      "2️⃣ *Upload an image* 📷\n" +
      "3️⃣ *Let the AI work its magic!* ✨\n" +
      "4️⃣ *Save or share your transformed artwork!*\n\n" +
      "🚀 *More styles and features coming soon!* Stay creative! 🎭✨\n\n" +
      "👨‍💻 Made with ❤️ by [Rajarshi Samaddar](https://techrahis.com)\n" +
      "🔗 *GitHub:* [View Source Code](https://github.com/techrahis/spirited-art)",
      {
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }
  );
}

export default aboutHandler;

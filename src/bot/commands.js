import startHandler from "./handlers/startHandler.js";
import imageHandler from "./handlers/imageHandler.js";
import styleHandler from "./handlers/styleHandler.js";
import aboutHandler from "./handlers/aboutHandler.js";
import generatedHandler from "./handlers/generatedHandler.js";
import galleryPaginationHandler from "./handlers/galleryPaginationHandler.js";

export default function setupCommands(bot) {
  bot.start(startHandler);

  // Handle style selection for each button
  const styles = [
    "GHIBLI",
    "ANIME",
    "CYBERPUNK",
    "CARTOON",
    "SAMURAI",
    "RETRO",
  ];

  styles.forEach((style) => {
    bot.action(style, (ctx) => styleHandler(ctx, style));
  });

  bot.on("photo", imageHandler);
  bot.action("ABOUT", aboutHandler);
  bot.action("GENERATED", generatedHandler);
  bot.on("text", startHandler);
  bot.action(/gallery:\d+/, galleryPaginationHandler);
}

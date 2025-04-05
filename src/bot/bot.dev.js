import { Telegraf } from "telegraf";
import setupCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function startDevBot() {
  setupCommands(bot);
  bot.launch();
  console.log("🤖 SPIRITED ART BOT is running...");

  // Graceful shutdown
  process.once("SIGINT", () => {
    bot.stop("SIGINT");
    console.log("🛑 Bot stopped.");
  });

  process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
    console.log("🛑 Bot stopped.");
  });
}

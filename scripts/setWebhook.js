import "dotenv/config";
import { Telegraf } from "telegraf";
import setupCommands from "../src/bot/commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);
setupCommands(bot);

const webhookURL = `${process.env.SERVER_URL}`;

(async () => {
  try {
    await bot.telegram.setWebhook(webhookURL);
    console.log("✅ Webhook set to:", webhookURL);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to set webhook:", err);
    process.exit(1);
  }
})();

import { Telegraf } from "telegraf";
import setupCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function startProdBot() {
  setupCommands(bot);

  const webhookURL = `${process.env.SERVER_URL}/api/webhook`;

  try {
    await bot.telegram.setWebhook(webhookURL, null, 8443);
    console.log("✅ Webhook set to:", webhookURL);
  } catch (err) {
    console.error("❌ Failed to set webhook:", err);
  }
}

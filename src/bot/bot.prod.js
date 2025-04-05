import { Telegraf } from "telegraf";
import setupCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function startProdBot() {
  setupCommands(bot);

  const webhookURL = `${process.env.VERCEL_URL}/api/webhook`;
  await bot.telegram.setWebhook(webhookURL);

  console.log("✅ Webhook set to:", webhookURL);
}

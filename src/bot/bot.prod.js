import { Telegraf } from "telegraf";
import setupCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function startProdBot() {
  setupCommands(bot);

  const webhookPath = `/api/webhook`;
  const fullWebhookUrl = `${process.env.VERCEL_URL}${webhookPath}`;

  await bot.telegram.setWebhook(fullWebhookUrl);
  console.log(`🚀 Webhook set to ${fullWebhookUrl}`);
}

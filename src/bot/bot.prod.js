// src/bot/bot.js
import { Telegraf } from "telegraf";
import setupCommands from "./commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function startProdBot(app) {
  setupCommands(bot);

  app.post(`/webhook/${bot.secretPathComponent()}`, (req, res) => {
    bot.handleUpdate(req.body, res);
  });

  await bot.telegram.setWebhook(
    `${process.env.VERCEL_URL}/webhook/${bot.secretPathComponent()}`
  );
  console.log("🤖 Webhook set and bot is ready!");
}

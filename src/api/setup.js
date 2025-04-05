import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function handler(req, res) {
  const webhookURL = `${process.env.SERVER_URL}/api/webhook`;

  try {
    await bot.telegram.setWebhook(webhookURL);
    console.log("✅ Webhook set to:", webhookURL);
    res.status(200).send(`✅ Webhook set to: ${webhookURL}`);
  } catch (err) {
    console.error("❌ Failed to set webhook:", err);
    res.status(500).send("❌ Failed to set webhook");
  }
}

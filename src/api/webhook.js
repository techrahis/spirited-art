import { Telegraf } from "telegraf";
import setupCommands from "../bot/commands.js";

// Initialize bot once
const bot = new Telegraf(process.env.BOT_TOKEN);
setupCommands(bot);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const rawBody = Buffer.concat(chunks).toString("utf8");
      const update = JSON.parse(rawBody);

      console.log("📨 Webhook received:", update);

      await bot.handleUpdate(update);
      return res.status(200).send("OK");
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      return res.status(500).json({
        error: true,
        message: "❌ Webhook Error",
        details: error.message,
      });
    }
  } else {
    return res.status(405).send("Method Not Allowed");
  }
}

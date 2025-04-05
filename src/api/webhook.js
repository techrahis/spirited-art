import { Telegraf } from "telegraf";
import setupCommands from "../bot/commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);
setupCommands(bot);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("📨 Webhook received:", req.body);
      await bot.handleUpdate(req.body);
      return res.status(200).send("OK");
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      return res.status(500).send("Error handling update");
    }
  } else {
    return res.status(405).send("Method Not Allowed");
  }
}

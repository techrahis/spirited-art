import { Telegraf } from "telegraf";
import setupCommands from "../bot/commands.js";

const bot = new Telegraf(process.env.BOT_TOKEN);
setupCommands(bot);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).send("ok");
    } catch (err) {
      console.error("❌ Webhook error:", err);
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

import "dotenv/config";
import connectDatabase from "./src/database/database.js";
import startDevBot from "./src/bot/bot.dev.js";
import startProdBot from "./src/bot/bot.prod.js";

async function main() {
  try {
    await connectDatabase();

    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Starting bot in development mode...");
      await startDevBot();
    }

    if (process.env.NODE_ENV === "production") {
      console.log("🚀 Starting bot in production mode...");
      await startProdBot();
    }
  } catch (error) {
    console.error("❌ Failed to start application:", error);
    process.exit(1);
  }
}

main();

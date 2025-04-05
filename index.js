import "dotenv/config";
import connectDatabase from "./src/database/database.js";
import startDevBot from "./src/bot/bot.dev.js";

async function main() {
  try {
    await connectDatabase();

    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Starting bot in development mode...");
      await startDevBot();
    }
  } catch (error) {
    console.error("❌ Failed to start application:", error);
    process.exit(1);
  }
}

main();

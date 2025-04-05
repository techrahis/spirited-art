import "dotenv/config";
import connectDatabase from "./src/database/database.js";
import startBot from "./src/bot/bot.js";

async function main() {
  try {
    await connectDatabase();

    await startBot();
  } catch (error) {
    console.error("❌ Failed to start application:", error);
    process.exit(1);
  }
}

main();

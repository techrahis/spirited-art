function generatedHandler(ctx) {
  ctx.answerCbQuery();
  ctx.reply(
    "📅 *Please enter a date in DD-MM-YYYY format to view past images:*",
    { parse_mode: "Markdown" }
  );
}

export default generatedHandler;

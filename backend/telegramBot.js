require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  switch (text) {
    case '/start':
      bot.sendMessage(chatId, 'Welcome to your bot. How may I assist you?');
      break;
    case '/notify':
      bot.sendMessage(chatId, 'Sending you a notification as requested.');
      break;
    default:
      bot.sendMessage(chatId, `You said: ${text}`);
  }
});
bot.on("polling_error", (error) => console.log(error));
module.exports = bot;
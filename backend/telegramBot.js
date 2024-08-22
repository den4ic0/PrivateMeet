require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is missing in .env file");
}

const bot = new TelegramBot(token, { polling: true });

const messages = {
  welcome: 'Welcome to your bot. How may I assist you?',
  notify: 'Sending you a notification as requested.',
  defaultResponse: text => `You said: ${text}`,
};

bot.on('message', (msg) => {
  const { chat, text } = msg;
  
  switch (text) {
    case '/start':
      bot.sendMessage(chat.id, messages.welcome);
      break;
    case '/notify':
      bot.sendMessage(chat.id, messages.notify);
      break;
    default:
      bot.sendMessage(chat.id, messages.defaultResponse(text));
  }
});

bot.on("polling_error", console.log);

module.exports = bot;
import TelegramBot from 'node-telegram-bot-api';

export default defineNitroPlugin((nitroApp) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  // const bot = new TelegramBot(token, { polling: true });
  // bot.on('message', (msg) => {
  //   console.log('Received:', msg.text);
  //   bot.sendMessage(msg.chat.id, 'Hello from Nuxt server!');
  // });

  // nitroApp.hooks.hook('close', () => bot.stopPolling());
  // nitroApp.tgBot = bot;
  console.log('Telegram bot started!');
});

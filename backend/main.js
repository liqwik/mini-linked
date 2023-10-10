import 'dotenv/config';
import { Markup, Telegraf } from 'telegraf';
import { BOT_TOKEN, BOT_WELCOME_MESSAGE, WEB_APP_URL } from './config.js';

const bot = new Telegraf(BOT_TOKEN);

bot.start(async ctx => {
  await ctx.setChatMenuButton({
    text: 'View Jobs',
    type: 'web_app',
    web_app: { url: WEB_APP_URL },
  });

  await ctx.reply(BOT_WELCOME_MESSAGE, Markup.inlineKeyboard([Markup.button.webApp('View Jobs', WEB_APP_URL)]));
});

bot.command('restart', async ctx => {
  await ctx.setChatMenuButton({
    text: 'View Jobs',
    type: 'web_app',
    web_app: { url: WEB_APP_URL },
  });

  await ctx.reply(BOT_WELCOME_MESSAGE, Markup.inlineKeyboard([Markup.button.webApp('View Jobs', WEB_APP_URL)]));
});

bot.use(async (ctx, next) => {
  console.time(`Processing update ${ctx.update.update_id}`);
  await next();

  console.timeEnd(`Processing update ${ctx.update.update_id}`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

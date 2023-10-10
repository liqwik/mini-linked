import 'dotenv/config'
import { Input, Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { link } from "telegraf/format";
import { BOT_TOKEN, BOT_WELCOME_MESSAGE, WEB_APP_URL } from './config.js';

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  await ctx.setChatMenuButton({
    text: "View Jobs",
    type: "web_app",
    web_app: { url: WEB_APP_URL },
  });

  await ctx.reply(BOT_WELCOME_MESSAGE,
    Markup.inlineKeyboard([Markup.button.webApp("View Jobs", WEB_APP_URL)])
  );
});

bot.command("quit", async (ctx) => {
  // Explicit usage
  // await ctx.telegram.leaveChat(ctx.message.chat.id);
  // Using context shortcut
  // await ctx.leaveChat();
});

bot.command('restart', async (ctx) => {
  await ctx.setChatMenuButton({
    text: "View Jobs",
    type: "web_app",
    web_app: { url: WEB_APP_URL },
  });

  await ctx.reply(welcomeMessage,
    Markup.inlineKeyboard([Markup.button.webApp("View Jobs", WEB_APP_URL)])
  );
});

bot.use(async (ctx, next) => {
  // console.log(`User: ${JSON.stringify(ctx.message.from)}`);
  console.time(`Processing update ${ctx.update.update_id}`);
  await next(); // runs next middleware
  // runs after next middleware finishes
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
});

/** Testing purpose ***/
bot.command("inlinekb", (ctx) =>
  ctx.reply(
    "Launch mini app from inline keyboard!",
    Markup.inlineKeyboard([Markup.button.webApp("Launch", WEB_APP_URL)])
  )
);

bot.command("link", (ctx) =>
  /*
    Go to @Botfather and create a new app for your bot first, using /newapp
    Then modify this link appropriately.

    startapp is optional.
    If provided, it will be passed as start_param in initData
    and as ?tgWebAppStartParam=$command in the Web App URL
  */
  ctx.reply(link("Launch", "https://t.me/$botname/$appname?startapp=$command"))
);

bot.on("inline_query", (ctx) =>
  ctx.answerInlineQuery([], {
    button: { text: "Launch", web_app: { url: WEB_APP_URL } },
  })
);

bot.command("keyboard", (ctx) =>
  ctx.reply(
    "Launch mini app from keyboard!",
    Markup.keyboard([Markup.button.webApp("Launch", WEB_APP_URL)]).resize()
  )
);

bot.command("setmenu", (ctx) =>
  // sets Web App as the menu button for current chat
  ctx.setChatMenuButton({
    text: "Launch",
    type: "web_app",
    web_app: { url: WEB_APP_URL },
  })
);

bot.start((ctx) => ctx.reply(""));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => {
  return ctx.reply("👍");
});

bot.command("onetime", (ctx) =>
  ctx.reply(
    "One time keyboard",
    Markup.keyboard(["/simple", "/inline", "/pyramid"]).oneTime().resize()
  )
);

bot.command("custom", async (ctx) => {
  return await ctx.reply(
    "Custom buttons keyboard",
    Markup.keyboard([
      ["🔍 Search", "😎 Popular"], // Row1 with 2 buttons
      ["☸ Setting", "📞 Feedback"], // Row2 with 2 buttons
      ["📢 Ads", "⭐️ Rate us", "👥 Share"], // Row3 with 3 buttons
    ])
      .oneTime()
      .resize()
  );
});

bot.hears("🔍 Search", (ctx) => ctx.reply("Yay!"));
bot.hears("📢 Ads", (ctx) => ctx.reply("Free hugs. Call now!"));

bot.command("special", (ctx) => {
  return ctx.reply(
    "Special buttons keyboard",
    Markup.keyboard([
      Markup.button.contactRequest("Send contact"),
      Markup.button.locationRequest("Send location"),
    ]).resize()
  );
});

bot.command("pyramid", (ctx) => {
  return ctx.reply(
    "Keyboard wrap",
    Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
    })
  );
});

bot.command("simple", (ctx) => {
  return ctx.replyWithHTML(
    "<b>Coke</b> or <i>Pepsi?</i>",
    Markup.keyboard(["Coke", "Pepsi"])
  );
});

bot.command("inline", (ctx) => {
  return ctx.reply("<b>Coke</b> or <i>Pepsi?</i>", {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      Markup.button.callback("Coke", "Coke"),
      Markup.button.callback("Pepsi", "Pepsi"),
    ]),
  });
});

bot.command("random", (ctx) => {
  return ctx.reply(
    "random example",
    Markup.inlineKeyboard([
      Markup.button.callback("Coke", "Coke"),
      Markup.button.callback("Dr Pepper", "Dr Pepper", Math.random() > 0.5),
      Markup.button.callback("Pepsi", "Pepsi"),
    ])
  );
});

bot.command("caption", (ctx) => {
  return ctx.replyWithPhoto(
    { url: "https://picsum.photos/200/300/?random" },
    {
      caption: "Caption",
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        Markup.button.callback("Plain", "plain"),
        Markup.button.callback("Italic", "italic"),
      ]),
    }
  );
});

bot.hears(/\/wrap (\d+)/, (ctx) => {
  return ctx.reply(
    "Keyboard wrap",
    Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
      columns: parseInt(ctx.match[1]),
    })
  );
});

bot.action("Dr Pepper", (ctx, next) => {
  return ctx.reply("👍").then(() => next());
});

bot.action("plain", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageCaption(
    "Caption",
    Markup.inlineKeyboard([
      Markup.button.callback("Plain", "plain"),
      Markup.button.callback("Italic", "italic"),
    ])
  );
});

bot.action("italic", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageCaption("_Caption_", {
    parse_mode: "Markdown",
    ...Markup.inlineKeyboard([
      Markup.button.callback("Plain", "plain"),
      Markup.button.callback("* Italic *", "italic"),
    ]),
  });
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,

)
import logging
import asyncio
from data import store_user
from telegram import Bot
from telegram.ext import Updater, CommandHandler
BOT_TOKEN = "6472411096:AAEBtzz09FKJzOlTKFdslHmVFm-sLnFZ17E"
#!/usr/bin/env python
# pylint: disable=unused-argument, import-error
# This program is dedicated to the public domain under the CC0 license.

"""
First, a few callback functions are defined. Then, those functions are passed to
the Application and registered at their respective places.
Then, the bot is started and runs until we press Ctrl-C on the command line.

Usage:
Example of a bot-user conversation using ConversationHandler.
Send /start to initiate the conversation.
Press Ctrl-C on the command line or send a signal to the process to stop the
bot.
"""

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
# set higher logging level for httpx to avoid all GET and POST requests being logged
logging.getLogger("httpx").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)

GENDER, PHOTO, LOCATION, BIO, INPUT_KEYWORD, SEARCH, SELECT = range(7)


# def start(update, context):
#     """Handler for the /start command."""
#     # user = update.message.from_user
#     user_id = update.effective_user.id
#     context.bot.send_message(
#         chat_id=user_id, text="Welcome to the subscription alert bot!")


def subscribe(update, context):
    """Handler for the /subscribe command."""
    user_id = update.effective_user.id
    context.user_data['subscribed'] = True
    context.bot.send_message(
        chat_id=user_id, text="You are now subscribed to alerts!")


bot = Bot(token=BOT_TOKEN)


async def alert_subscribers(user_id):
    await bot.send_message(chat_id=user_id, text="Hello world")
    # """Send alerts to subscribed users."""
    # for user_id in context.job.context['subscribers']:
    #     context.bot.send_message(
    #         chat_id=user_id, text="New alert: Something important happened!")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = update.message.from_user
    if user:
        store_user(user)

    """Starts the conversation and asks the user about their gender."""
    reply_keyboard = [["Search", "Subsrcibe", "Done"]]
    await update.message.reply_text(
        "Hi! My name is Telegram  Job  Search Bot. I will hold a conversation with you. "
        "Send /done to stop talking to me.\n\n"
        "Which action you would like to do? Search | Susbcribe | Done",
        reply_markup=ReplyKeyboardMarkup(
            reply_keyboard, one_time_keyboard=True, input_field_placeholder="Search or Subscribe?"
        ),
    )

    return SELECT


async def input_keyword(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = update.message.from_user
    logger.info("keyword %s: %s", user.first_name, update.message.text)
    await update.message.reply_text("Thank you! Let me find some job for you")
    # #results = search(update.message.text)
    # if len(results) > 0:
    #     await update.message.reply_text("We found some result(s) for you : ")
    #     for job in results:
    #         message_text = format_result(job)
    #         await update.message.reply_markdown_v2(message_text, disable_web_page_preview=True)
    #         web_view_button = InlineKeyboardButton(
    #             "Open Web View", url=job['url'])
    #         reply_markup = InlineKeyboardMarkup([[web_view_button]])
    #         await update.message.reply_text(message_text, reply_markup=reply_markup)
    # else:
    #     await update.message.reply_markdown_v2('*Not found *')
    reply_keyboard = [["Search", "Subsrcibe", "Done"]]

    await update.message.reply_text("Which action you would like to do? Search | Susbcribe | Done",
                                    reply_markup=ReplyKeyboardMarkup(
                                        reply_keyboard, one_time_keyboard=True, input_field_placeholder="Search or Subscribe?"
                                    ),
                                    )


async def search_for_job(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = update.message.from_user
    logger.info("searching...... %s: %s", user.first_name, update.message.text)
    await update.message.reply_text("Here is the search result:.....")
    return ConversationHandler.END


async def select(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = update.message.from_user
    logger.info("selection of %s: %s", user.first_name, update.message.text)
    if "Search" == update.message.text:
        await update.message.reply_text("Please input keyword ex: Developer...")
        return INPUT_KEYWORD
    elif "Subscribe" == update.message.text:
        await update.message.reply_text("Please input keyword ex: Developer...")
        return INPUT_KEYWORD

    else:
        await update.message.reply_text("Thank you. Bye !")
        return ConversationHandler.END

    return INPUT_KEYWORD


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Cancels and ends the conversation."""
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    await update.message.reply_text(
        "Bye! I hope we can talk again some day.", reply_markup=ReplyKeyboardRemove()
    )

    return ConversationHandler.END


def main():
    # Create an Updater instance
    application = Application.builder().token(BOT_TOKEN).build()
    # Add conversation handler with the states GENDER, PHOTO, LOCATION and BIO
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            INPUT_KEYWORD: [MessageHandler(filters.TEXT & ~filters.COMMAND, input_keyword)],
            SELECT: [MessageHandler(filters.Regex("^(Search|Susbcribe|Done)$"), select)],
            SEARCH: [MessageHandler(filters.TEXT & ~filters.COMMAND, search_for_job)],
        },
        fallbacks=[CommandHandler("cancel", cancel)],
    )

    application.add_handler(conv_handler)
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    # main()
    asyncio.run(alert_subscribers("886906080"))

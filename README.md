# Mini Linked: Mini App for Job Seekers

[@MiniLinkedBot](https://t.me/MiniLinkedBot) - is a Telegram Mini App that providing the global job search and connecting talented individuals with exciting career opportunities.

## Tech Stack

- **Frontent** NextJS, TailwindCSS
- **Backend** KoaJS

## Requirements

- Telegram Bot
- NodeJS (Latest LTS version recommended)

## Start the application

### Frontend

```
$ cd frontend
$ yarn install
$ cp .env.example .env
```

> Replace the Job Listing API, or use this endpoint https://mnl-api.quiclabs.com for testing

```
$ yarn dev
```

### Backend

```
$ cd backend
$ yarn install
$ cp .env.example .env
```

`BOT_WELCOME_MESSAGE` This is the Bot welcome message

`BOT_TOKEN` This is the access token that you get from @BotFather when you create your Telegram bot.

`WEB_APP_URL` This is the url of the frontend

- Replace BOT_WELCOME_MESSAGE with your sweet message
- Replace BOT_TOKEN by obtain your Bot Token from BotFather
- Replace the WEB_APP_URL with the frontend endpoint
  > You may need "ngrok" to expose the frontend endpoint in order to make it valid in Telegram Mini App

**3. Start the app**

```
$ yarn dev
```

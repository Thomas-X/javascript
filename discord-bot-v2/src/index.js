import Bot from "./classes/Bot";

require('dotenv').config()


export const bot = new Bot(process.env.DISCORD_BOT_TOKEN);
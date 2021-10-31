require('dotenv').config();

const {Client} = require('discord.js');

const client = new Client({intents: ['DIRECT_MESSAGES']});

client.login(process.env.BORED_BOT_TOKEN);

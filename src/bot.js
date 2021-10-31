require('dotenv').config();
const https = require('https');

const {Client} = require('discord.js');

const client = new Client({
    intents: ['DIRECT_MESSAGES', 'GUILD_MESSAGES', 'GUILDS']
});

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
});

client.login(process.env.BORED_BOT_TOKEN);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    let msg = message.content.toLowerCase();
    if (msg.includes('bored') || msg.includes('boring')) {
        https
            .get('https://www.boredapi.com/api/activity/', (res) => {
                let dataStr = '';
                res.on('data', (chunk) => {
                    dataStr += chunk;
                });
                res.on('end', () => {
                    let data = JSON.parse(dataStr);
                    message.reply(
                        `${data.activity} (${data.type}) \n
                        ${data.link.length > 0 ? data.link : ''}`
                    );
                });
            })
            .on('error', (e) => {
                console.error(e);
            });
    }
});

client.on('guildCreate', async (guild) => {
    console.log(`Joined guild: ${guild.name}`);
    guild.systemChannel.send(
        `${client.user.username} is ready! \nYou'll never be bored again!`
    );
});

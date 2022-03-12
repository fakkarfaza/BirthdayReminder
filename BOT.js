const { keepAlive } = require('./server')
const Discord = require("discord.js")
const fs = require("fs")
const mongoose = require("mongoose")
require("dotenv").config()
const bot = new Discord.Client({
    intents : 32767
})
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()  
bot.prefix = "*"


loadEvents = () => {
    console.log(`Info: Loading event files ...`);
    const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
    for (const eventFile of eventFiles)
    {
        const event = require(`./events/${eventFile}`);
        if (event.once) bot.once(event.name, event.run.bind(undefined, bot));
        else bot.on(event.name, event.run.bind(undefined, bot));
        console.log(`Info: Event ready: ${event.name}`);
    }
};

loadCommands = () => {
    console.log(`Info: Loading command files ...`);
    const commandFiles = fs.readdirSync(`./commands`).filter(f => f.endsWith('.js'));
    for (const commandFile of commandFiles)
    {
        const command = require(`./commands/${commandFile}`);
        bot.commands.set(command.name, command);
        if (command.aliases) command.aliases.forEach(alias => bot.aliases.set(alias, command.name));
        console.log(`Info: Command ready: ${commandFile}`);
    }
};

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_ADDR}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('[INFO] Database connected'))
.catch(e => console.log(`Error: ${e}`))

loadEvents();
loadCommands();
bot.login(process.env.BOT_TOKEN);
keepAlive();


const { Client, Message } = require("discord.js");

module.exports = {
    name: 'hello',
    description: 'greet users',
    permission: {
        user: [],
        bot: []
    },
    min_args: 0,
    args: [],
    aliases: ["hello", "h"],
    /**
     * @param {Client} bot 
     * @param {Message} message 
     */
    run: async(bot, message) => {
            message.channel.send("hello world!");
    }
};
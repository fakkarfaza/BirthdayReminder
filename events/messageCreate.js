const { Client, Message } = require("discord.js");


module.exports = {
    name: 'messageCreate',
    /**
     * @param {Client} bot
     * @param {Message} message
     */
    run: async(bot, message) => {   
            // if (!message.author.bot || !message.guild || message.author == bot.user) return;
            // if (!message.content.startsWith(bot.prefix)) return;

            // checking the avaibility of the command
            let [cmd, ...args] = message.content.slice(bot.prefix.length).trim().split(/ +/g)
            let command = bot.commands.get(cmd.toLowerCase()) || bot.commands.get(bot.aliases.get(cmd.toLowerCase()));
            if (!command) return;
            if (command.min_args > args.length) return message.channel.send(`Incomplete arguments, please try again!`);
            if (
                command.permission.user.length == 0 ||
                command.permission.bot.length == 0 ||
                message.member.hasPermission(command.permission.user) ||
                message.guild.me.hasPermission(command.permission.bot) 
            )
            {
                return command.run(bot, message, args);
            }
      }
}
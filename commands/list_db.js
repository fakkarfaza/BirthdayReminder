const { Client, Message } = require("discord.js");
const birthday = require("../DBcollection/birthday")

module.exports = {
    name: 'list_db',
    description: 'show birthday date list from database without a format',
    permission: {
        user: [],
        bot: []
    },
    min_args: 0,
    args: [],
    aliases: ["checkdb", "cdb"],
    /**
     * @param {Client} bot 
     * @param {Message} message 
     */
    run: async(bot, message) => {
        birthday.find({}, async(error, bday_list) => {
            // console.log(bday_list)
            var tempor = []
            bday_list.forEach(element => {
                tempor.push(element)
            });
            await message.channel.send({content:tempor.join(' ')})
        })
    }
    
};
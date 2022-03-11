const { Client, Message } = require("discord.js");
const birthday = require("../DBcollection/birthday")

module.exports = {
    name: 'list',
    description: 'show birthday date list',
    permission: {
        user: [],
        bot: []
    },
    min_args: 0,
    args: [],
    aliases: ["l"],
    /**
     * @param {Client} bot 
     * @param {Message} message 
     */
    run: async(bot, message) => {
        birthday.find({}, async(error, bday_list) => {
            console.log(bday_list)
            console.log("A")
            var tempor = []
            bday_list.forEach(element => {
                tempor.push(element)
            });
            await message.channel.send({content:tempor.join(' ')})
            console.log("B")
        })
    }
    
};
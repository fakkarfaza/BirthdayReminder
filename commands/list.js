const { Client, Message } = require("discord.js");
const birthday = require("../DBcollection/birthday")
const moment = require("moment-timezone")

module.exports = {
    name: 'list',
    description: 'give a list consist of all birthday data',
    permission: {
        user: [],
        bot: []
    },
    min_args: 0,
    args: [],
    aliases: ["list", "l"],
    /**
     * @param {Client} bot 
     * @param {Message} message 
     */
    run: async(bot, message) => {
            let date = moment().tz('Asia/Jakarta').toDate()
            let x = await birthday.find()
            let m = []
            var i = 1
            var sort = x.sort((a, b) => new moment(a.bday) - new moment(b.bday))
            // console.log(sort)
            sort.forEach(bd => {
                m.push(`${i}. User <@${bd.user_id}>, born ${moment(bd.bday).format("D MMMM YYYY")}`)
                i++;
            })
            message.channel.send({content: m.join("\n")}).catch(()=>{
                message.channel.send("List birthday kosong")
            })
    }
};
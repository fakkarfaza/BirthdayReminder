const { Client, Message } = require("discord.js");
const birthday = require("../DBcollection/birthday")
const moment = require("moment-timezone")
const cron = require("node-cron")
require("dotenv").config()

module.exports = {
    name: 'ready',
    /**
     * @param {Client} bot
     * @param {Message} message
     */
    run: async(bot, message) => {
        console.log("Bot is ready")   
        cron.schedule("0 1 0 * * *", async() => {
            var bday_tday = await birthday.find()
            var x = []
            bday_tday.forEach(element => {
                var age =  moment().tz("Asia/Jakarta").year() - moment(element.bday).year()
                if (moment(element.bday).date() == moment().tz("Asia/Jakarta").date()) {
                    bot.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(process.env.CHANNEL_ID).send(`Selamat ulang tahun <@${element.user_id}> ke-${age} :tada: \nMari rayakan bersama dengan semua @everyone`)
                }
            });
        }, {timezone:"Asia/Jakarta"})
    }
}
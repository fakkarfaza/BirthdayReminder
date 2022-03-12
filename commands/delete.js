const { Client, Message } = require("discord.js");
const birthday = require("../DBcollection/birthday")

module.exports = {
    name: 'delete',
    description: 'take input birthday date from user',
    permission: {
        user: [],
        bot: []
    },
    min_args: 0,
    args: [],
    aliases: ["delete", "d", "del"],
    /**
     * @param {Client} bot 
     * @param {Message} message 
     */
     run: async(bot, message) => {
        var answer = []
        const filter = (m) => { //Membuat filter agar orang yang request yang bisa menjawab pertanyaan dari bot
            return message.author.id == m.author.id
        }
        const q1 = await message.channel.send("Operasi delete apa yang anda lakukan?\n1. Delete salah satu data\n2. Delete semua data?")
        // Take user_id input
        const collector = message.channel.createMessageCollector({
            filter, 
            max:2,
            time: 20_000 //Limit time exceeded kalau tidak menjawab lebih dari satu menit
        })
        collector.on("collect", async(m)=>{
            answer.push(m.content)
            if (answer.length == 1) {
                if (Number(answer[0]) == 1) message.channel.send("Data user mana yang anda akan delete?")
                if (Number(answer[0]) == 2)  message.channel.send("Apa anda yakin delete semua data? (y/n)")
            }
            if (answer.length == 2) {
                collector.stop("selesai")
            }
        })
        collector.on("end", async (m, reason)=>{ //Kalau udah lebih dari 1 menit tidak menjawab mka do
            if (reason == "selesai") {
                if (Number(answer[0]) == 1) {
                    var user_id = answer[1].replace(/[\\<>@!]/g, "")
                    await birthday.deleteOne({user_id: user_id})
                    message.channel.send("Data berhasil didelete!")
                }
                if (Number(answer[0]) == 2 && answer[1] == "y" || answer[1] == "Y" && message.author.id == "174137093822349312") {
                    await birthday.remove()
                    message.channel.send("Data berhasil didelete!")
                }
                else if (Number(answer[0]) == 2 && answer[1] == "y" || answer[1] == "Y" && message.author.id != "174137093822349312") {
                    message.channel.send("Anda tidak punya hak untuk menghapus semua")
                }    
            }
            else {
                message.channel.send("Kesempatan anda untuk menjawab telah habis")
            }
        })
}
};
const { Client, Message } = require("discord.js");
const birthday = require("../DBcollection/birthday")

module.exports = {
    name: 'insert',
    description: 'take input birthday date from user',
    permission: {
        user: [],
        bot: []
    },
    min_args: 0,
    args: [],
    aliases: ["input", "i"],
    /**
     * @param {Client} bot 
     * @param {Message} message 
     */
    run: async(bot, message) => {
            var id_temp, date_temp
            
            const q1 = await message.channel.send("Ulang tahun siapa yang anda input?")
            const filter = (m) => { //Membuat filter agar orang yang request yang bisa menjawab pertanyaan dari bot
                return message.author.id == m.author.id
            }
            // Take user_id input
            const collector = message.channel.createMessageCollector({
                filter, 
                max:1,
                time: 10000 //Limit time exceeded kalau tidak menjawab lebih dari satu menit
            })
            collector.on("collect", async(m)=>{
                id_temp = "fakkar"
                // collector.stop()
                // q1.delete()
                // const q2 = await message.channel.send("Kapan dia berulang tahun?")
                // // Take bdate
                // const collector2 = message.channel.createMessageCollector({
                //     filter, 
                //     max:1,
                //     time: 10000 //Limit time exceeded kalau tidak menjawab lebih dari satu menit
                // })
                // collector2.on("end", (m)=>{ //Kalau udah lebih dari 1 menit tidak menjawab mka do
                //     q2.edit("Waktu anda untuk menjawab telah habis!")
                // })
                // collector2.on("collect", async(m)=>{
                //     date_temp = m.content
                //     collector2.stop()
                //     q2.delete()
                //     await message.channel.send("Data baru telah ditambahkan")
                // })
                // var date = new Date(date_temp).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
                // date = new Date(date);
                await birthday.create({
                    user_id: id_temp,
                    // bdate: date
                })
            })
            collector.on("end", (m)=>{ //Kalau udah lebih dari 1 menit tidak menjawab mka do
                q1.edit("Waktu anda untuk menjawab telah habis!")
            })

    }
};
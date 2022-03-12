const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    user_id: String,
    bday: Date,
}, {versionKey: false})

module.exports = mongoose.models.Birthday || mongoose.model('Birthday', BirthdaySchema)
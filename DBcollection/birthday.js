const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    user_id: String,
    bday: Date,
})

module.exports = mongoose.models.Birthday || mongoose.model('Birthday', BirthdaySchema)
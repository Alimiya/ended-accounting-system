const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    title: String,
    name: String,
    description: String,
    status: {
        type: String,
        enum: ['ожидание', 'в обработке', 'отклонен', 'завершен'],
        default: 'ожидание'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request
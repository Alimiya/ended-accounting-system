const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const route = require('./routes/route')
const requests = require('./routes/requests')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + "/public"))

mongoose.connect('mongodb+srv://123:123@cluster0.lzwnvhk.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error)
    })

app.use(route)
app.use(requests)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
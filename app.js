require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connection Successful'))

app.use(express.json())

const subscriberRouter = require('./routes/subscribers')
app.use('/subscribers', subscriberRouter)


const port = 3000
app.listen(port, () => {
    console.log(`Server started at: http://127.0.0.1:${port}`)
})
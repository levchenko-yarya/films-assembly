require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const movieRouter = require('./movie/router')
const apiRouter = require('./api/router')
const app = express()

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', apiRouter)
app.use('/', movieRouter)

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, (err) => {
    if (err) return console.log(err)
    app.listen(process.env.PORT)
})
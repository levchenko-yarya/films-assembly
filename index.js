const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const movieRouter = require('./routes/movieRouter')
const apiRouter = require('./routes/apiRouter')
const app = express()

app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: false}))


app.use('/api', apiRouter)
app.use('/', movieRouter)

const port = 3000;

mongoose.connect('mongodb://localhost:27017/kino-db', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) return console.log(err)
    app.listen(port)
})
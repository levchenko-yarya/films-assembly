require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')

const movieRouter = require('./movie/router')
const apiRouter = require('./api/router')

const app = express()

app.set('view engine', 'hbs')
//app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_DOMAIN);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
)
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
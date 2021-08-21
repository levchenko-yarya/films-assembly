const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('films assembly')
})

app.listen(3000)
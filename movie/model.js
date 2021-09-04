const mongoose = require('mongoose')

const Schema = mongoose.Schema
const movieSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    poster: {
        type: String
    },
    url: {
        type: String
    },
    date: {
        type: Date
    },
    datetime: {
        type: String
    }
})

module.exports = mongoose.model('Movie', movieSchema)
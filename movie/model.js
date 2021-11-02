const mongoose = require('mongoose')

const Schema = mongoose.Schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
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
    datetime: {
        type: Date
    },
    date: {
        type: String
    }
})

module.exports = mongoose.model('Movie', movieSchema)
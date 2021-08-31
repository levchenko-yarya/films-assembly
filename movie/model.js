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
    datetime: {
        type: Date
    }
})

module.exports = mongoose.model('Movie', movieSchema)
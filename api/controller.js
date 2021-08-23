const Movie = require('../movie/model')

exports.show = (req, res) => {
    Movie.find({}, (err, movies) => {
        if (err) return res.status(400)
        res.send(movies)
    })
}

exports.get = (req, res) => {
    return Movie.findById(req.params.id, (err, movie) => {
        if (!err) {
            return res.send(movie)
        }
    })
}
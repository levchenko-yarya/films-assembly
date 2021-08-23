const Movie = require('../movie/model')

exports.show = (req, res) => {
    Movie.find({}, (err, movies) => {
        if(err) {
            return res.status(400)
        }
        res.send(movies)
    })
}

exports.post = (req, res) => {

    const movie = new Movie({
        title: req.body.title
    })

    movie.save()
}
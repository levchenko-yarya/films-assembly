const Movie = require('../movie/model')

// показать все фильмы
exports.show = async (req, res) => {
    const movies = await Movie
        .find({})
        .sort({
            datetime: 1
        })
    return res.send(movies)
}

// показать ближайшие 5 фильмов
exports.coming = async (req, res) => {
    const movies = await Movie
        .find({})
        .sort({
            datetime: 1
        })
        .limit(2)
    return res.send(movies)
}

// показать фильм по id
exports.get = (req, res) => {
    return Movie.findById(req.params.id, (err, movie) => {
        if (!err) {
            return res.send(movie)
        }
    })
}

// добавить фильм
exports.store = (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        poster: req.body.poster,
        url: req.body.url,
        date: req.body.date
    })
    movie.save()
    return res.send('movie is added')
}

// обновить инфу по фильму
exports.update = (req, res, next) => {
    if (!req.params.id) return next(new Error('no Movie id!'))
    Movie.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        (error, movie) => {
            if (error) return next(error)
            return res.send('movie is updated')
        }
    )
}

// удалить фильм по id
exports.delete = (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id, (error, movie) => {
        if (!movie) return next(new Error('Movie not found'))
        return res.send('movie delete')
    })
}
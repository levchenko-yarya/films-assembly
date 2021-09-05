const Movie = require('./model')
const moment = require('moment')

// показать все фильмы
exports.show = async (req, res) => {
    const newMovies = await Movie
        .find({datetime: {$gte: Date.now()}})
        .sort({
            datetime: 1
        })
    const oldMovies = await Movie
        .find({datetime: {$lte: Date.now()}})
        .sort({
            datetime: -1
        })

    res.render('index.hbs', {
        newMovies: newMovies,
        oldMovies: oldMovies
    })
}

// показать все фильмы
exports.all = async (req, res) => {
    const movies = await Movie.find({}).sort({date: 1})
    res.render('watch.hbs', {
        movies: movies
    })
}

// показать фильм по id
exports.get = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (!movie) {
            res.statusCode = 404
            return res.send({error: 'Not found'})
        }
        if (!err) {
            return res.render('movie.hbs', {
                movie: movie
            })
        } else {
            res.statusCode = 500
            log.error('Internal error(%d): %s', res.statusCode, err.message)
            return res.send({error: 'Server error'})
        }
    })
}

// страница добавления фильма
exports.add = (req, res) => {
    res.render('create.hbs')
}

// добавить фильм
exports.store = (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        poster: req.body.poster,
        url: req.body.url,
        datetime: req.body.datetime,
        date: moment(req.body.datetime).locale('ru').format('DD MMMM YYYY')
    })
    movie.save()
    res.redirect('/')
}

// страница обновления фильма
exports.edit = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (!movie) {
            res.statusCode = 404
            return res.send({error: 'Not found'})
        }
        if (!err) {
            return res.render('update.hbs', {
                movie: movie
            })
        } else {
            res.statusCode = 500
            log.error('Internal error(%d): %s', res.statusCode, err.message)
            return res.send({error: 'Server error'})
        }
    })
}

//! error - no update,
// ??? datetime !!!
// обновить инфу по фильму
exports.update = (req, res) => {
    Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            poster: req.body.poster,
            url: req.body.url,
            datetime: req.body.datetime,
            date: moment(req.body.datetime).locale('ru').format('DD MMMM YYYY')
        },
        () => {
            res.redirect('/')
        }
    )
}

// удалить фильм по id
exports.delete = (req, res, next) => {
    if (!req.params.id) return next(new Error('no Movie id!'))
    Movie.findById(req.params.id, (error, movie) => {
        if (error) return next(error)
        if (!movie) return next(new Error('Movie not found'))
        movie.remove((error, doc) => {
            if (error) return next(error)
            res.redirect('/')
        })
    })
}
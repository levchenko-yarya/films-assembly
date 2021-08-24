const Movie = require('./model')

// показать все фильмы
exports.show = (req, res) => {
    Movie.find({}, (err, allMovies) => {
        if (err) {
            return res.status(400)
        }
        res.render('index.hbs', {
            movies: allMovies
        })
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
        date: req.body.date.toString('dd.MM.yyyy')
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

/*exports.update = (req, res) => {
    return Movie.findByIdAndUpdate({_id: req.params.id}, {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            date: req.body.date
        },
        (err, movie) => {
            if (!movie) {
                res.statusCode = 404
                return res.send({error: 'Not found'})
            }
            return movie.updateOne((err) => {
                if (!err) {
                    return res.send({status: 'OK'})
                } else {
                    res.statusCode = 500
                    return res.send({error: 'Server error'})
                }
            })
        })
}*/

// обновить инфу по фильму
exports.update = (req, res, next) => {
    if (!req.params.id) return next(new Error('no Movie id!'))
    Movie.findByIdAndUpdate(
        req.params.id,
        {$set: req.body.title},
        (error, doc) => {
            if (error) return next(error)
            res.send(doc)
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
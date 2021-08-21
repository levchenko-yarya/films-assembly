const Movie = require('../models/movie')

exports.show = (req, res) => {
    Movie.find({}, (err, allMovies) => {
        if(err) {
            return res.status(400)
        }
        res.render('index.hbs', {
            movies: allMovies
        })
    })
}

exports.get = (req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if(!movie) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', movie:movie });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error' });
        }
    })
}

exports.add = (req, res) => {
    res.render('create.hbs')
}

exports.post = (req, res) => {
    
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        date: req.body.date
    })

    movie.save()

    res.redirect('/')
}

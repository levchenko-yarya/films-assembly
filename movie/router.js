const express = require('express')
const controller = require('./controller')
const router = express.Router()


router.use('/film/:id', controller.get)
router.use('/add-film', controller.add)
router.use('/post', controller.store)
router.get('/update/:id', controller.edit)
router.post('/update/:id', controller.update)
router.use('/delete/:id', controller.delete)
router.use('/watched-films', controller.watched)
router.use('/', controller.show)

module.exports = router
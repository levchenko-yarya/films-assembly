const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.use('/film/:id', controller.get)
router.use('/add-film', controller.add)
router.use('/post', controller.store)

router.use('/edit/:id', controller.edit)
router.use('/update', controller.update)

router.use('/', controller.show)

module.exports = router
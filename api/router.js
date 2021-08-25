const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/films', controller.show)
router.get('/film/:id', controller.get)
router.post('/film/post', controller.store)
router.put('/film/:id/update', controller.update)
router.delete('/film/:id/delete', controller.delete)

module.exports = router
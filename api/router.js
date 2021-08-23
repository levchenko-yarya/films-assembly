const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.post('/post', controller.post)
router.get('/', controller.show)

module.exports = router
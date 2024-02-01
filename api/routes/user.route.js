const userController = require('../controllers/user.controller')
const router = require('express').Router()

router.get('/', userController.getStatus)

module.exports = router
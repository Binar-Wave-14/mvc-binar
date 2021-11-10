const router = require('express').Router()

const {viewRegister, register, login} = require('../controllers/users.controller')

router.get('/register', viewRegister)
router.post('/register', register)

router.post('/login', login)

module.exports = router
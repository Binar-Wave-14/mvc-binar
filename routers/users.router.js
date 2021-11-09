const router = require('express').Router()

const {viewRegister, register} = require('../controllers/users.controller')

router.get('/register', viewRegister)
router.post('/register', register)

module.exports = router
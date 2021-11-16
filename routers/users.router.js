const router = require('express').Router()

const {viewRegister, register, login, viewLogin} = require('../controllers/users.controller')
const passport = require('../utils/passport')

const { validate } = require('../middlewares/validation.midleware')
const { registerSchema } = require('../schemas/register.schema')

router.get('/register', viewRegister)
router.post('/register', validate(registerSchema), register)

router.post('/login/web', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/login', login)
router.get('/login', viewLogin)

module.exports = router
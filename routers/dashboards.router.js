const router = require('express').Router()

const { viewDashboard } = require('../controllers/dashboards.controller')

router.get('/dashboard', viewDashboard)

module.exports = router
const upload = require('../middlewares/upload.middleware')

const uploadController = require('../controllers/upload.controller')

const router = require('express').Router()

router.post('/upload', upload.single('image'), uploadController.upload)

module.exports = router
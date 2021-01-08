const router = require('express').Router()

const weatherController = require('../controllers/weatherController')

router.get('/:lat/:lon', weatherController.getWeather)

module.exports = router
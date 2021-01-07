const router = require('express').Router();
const marvelController = require('../controllers/marvelController.js');

router.get('/', marvelController.getAll);




module.exports = router;
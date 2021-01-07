const router = require('express').Router();
const CharController = require('../controllers/charController.js');

router.get('/', CharController.getAllChars);

module.exports = router;

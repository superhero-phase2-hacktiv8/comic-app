const router = require('express').Router();
const CharController = require('../controllers/charController.js');

router.get('/', CharController.getAllChars);
router.get('/search/:name', CharController.findCharsByName);

module.exports = router;

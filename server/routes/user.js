const router = require('express').Router();
const CharController = require('../controllers/charController.js');

router.get('/:id/characters', CharController.findCharsByUserId);


module.exports = router;

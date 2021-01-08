const router = require('express').Router();
const CharController = require('../controllers/charController.js');

router.get('/', CharController.getAllChars);
router.get('/favorite', CharController.getAllCharsFavorite);
router.get('/search/:name', CharController.findCharsByName);
router.post('/add', CharController.addCharFavorite);
router.delete('/:id', CharController.destroyCharFavorite);



module.exports = router;
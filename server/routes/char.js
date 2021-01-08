const router = require('express').Router();
const CharController = require('../controllers/charController.js');

router.get('/', CharController.getAllChars);
router.get('/select2character', CharController.select2Character);
router.get('/favorite', CharController.getAllCharsFavorite);
router.post('/search', CharController.findCharsByName);
router.post('/add', CharController.addCharFavorite);

router.delete('/:id', CharController.destroyCharFavorite);



module.exports = router;
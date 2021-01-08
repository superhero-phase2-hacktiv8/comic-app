const router = require('express').Router();
const marvelController = require('../controllers/marvelController.js');

router.get('/', marvelController.getAll);
router.get('/:id', marvelController.showFavorite);
router.post('/', marvelController.favorite);
router.delete('/', marvelController.unfavorite);



module.exports = router;
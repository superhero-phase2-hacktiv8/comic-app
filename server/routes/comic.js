const router = require('express').Router();
const comicController = require('../controllers/comicController.js');

router.get('/', comicController.getAll);
router.get('/select2favorite', comicController.select2marvel);
router.post('/add', comicController.favorite);
router.delete('/:id', comicController.unfavorite);


module.exports = router;
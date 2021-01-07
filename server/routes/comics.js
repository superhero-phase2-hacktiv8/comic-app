const router = require('express').Router();
const ComicController = require('../controllers/comicController.js');

router.get('/', ComicController.getAllComics);



module.exports = router;
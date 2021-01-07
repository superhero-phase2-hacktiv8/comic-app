const router = require('express').Router();
const authRouter = require('./auth');
const isLogin = require('../middleware/isLogin')

const comicsRouter = require('../routes/comics.js');
const marvelRouter = require('../routes/marvel.js');

router.use('/marvel', marvelRouter);
router.use(authRouter);
router.use(isLogin)
router.get('/', (req, res) => {
    res.send('hello comic')
})
router.use('/comics', comicsRouter);

module.exports = router;
const router = require('express').Router();
const authRouter = require('./auth');
const isLogin = require('../middleware/isLogin')

const comicRouter = require('../routes/comic.js');
const charsRouter = require('../routes/char.js');
const weatherRouter = require('../routes/weather')

router.use(authRouter);
router.use(isLogin)
router.get('/', (req, res) => {
    res.send('hello comic')
})
router.use('/comic', comicRouter);
router.use('/characters', charsRouter);
router.use('/weather', weatherRouter)


module.exports = router;
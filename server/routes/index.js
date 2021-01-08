const router = require('express').Router();
const authRouter = require('./auth');
const isLogin = require('../middleware/isLogin')

const marvelRouter = require('../routes/marvel.js');
const comicsRouter = require('../routes/comics.js');
const charsRouter = require('../routes/char.js');
const userRouter = require('../routes/user.js');
const weatherRouter = require('../routes/weather')



router.use(authRouter);
router.use(isLogin)
router.get('/', (req, res) => {
    res.send('hello comic')
})
router.use('/marvel', marvelRouter);
router.use('/comics', comicsRouter);
router.use('/characters', charsRouter);
router.use('/user', userRouter);
router.use('/weather', weatherRouter)


module.exports = router;
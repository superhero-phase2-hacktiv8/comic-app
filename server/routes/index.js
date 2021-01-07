const router = require('express').Router();
const authRouter = require('./auth');
const isLogin = require('../middleware/isLogin')

const comicsRouter = require('../routes/comics.js');
const charsRouter = require('../routes/char.js');


router.use(authRouter);
router.use(isLogin)
router.get('/', (req, res) => {
    res.send('hello comic')
})
router.use('/comics', comicsRouter);
router.use('/characters', charsRouter);


module.exports = router;
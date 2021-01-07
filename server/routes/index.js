const router = require('express').Router();
const authRouter = require('./auth');
const isLogin = require('../middleware/isLogin')

router.use(authRouter);
router.use(isLogin)
router.get('/', (req, res) => {
    res.send('hello comic')
})

module.exports = router;
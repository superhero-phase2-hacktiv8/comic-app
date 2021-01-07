const router = require('express').Router();
const authRouter = require('./auth');

router.get('/', (req, res) => {
    res.send('hello comic')
})
router.use(authRouter);

module.exports = router;
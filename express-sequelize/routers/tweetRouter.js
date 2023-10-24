const router = require('express').Router();
const { tweetController } = require('../controllers')

router.post('/', tweetController.createTweet)
router.get('/', tweetController.getAllTweet)
router.delete('/:id', tweetController.getTweetById)



module.exports = router
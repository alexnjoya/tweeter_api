const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, tweetController.postTweet);
router.get('/', tweetController.getTweets);

module.exports = router;
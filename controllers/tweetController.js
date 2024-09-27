const { db } = require('../config/firebase');

exports.postTweet = async (req, res) => {
  const { content } = req.body;
  const tweet = { username: req.user.username, content, timestamp: new Date() };
  await db.collection('tweets').add(tweet);
  res.status(201).send("Tweet posted");
};

exports.getTweets = async (req, res) => {
  const tweetsSnapshot = await db.collection('tweets').orderBy('timestamp', 'desc').get();
  const tweets = tweetsSnapshot.docs.map(doc => doc.data());
  res.json(tweets);
};
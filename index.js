require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const tweetRoutes = require('./routes/tweetRoutes');

app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
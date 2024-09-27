const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/firebase');
const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.collection('users').doc(username).set({ username, password: hashedPassword });
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await db.collection('users').doc(username).get();
  if (userDoc.exists && await bcrypt.compare(password, userDoc.data().password)) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};
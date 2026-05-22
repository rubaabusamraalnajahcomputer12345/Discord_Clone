const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "discord_secret_key";
//Define localStorage for Node.js

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User created" });

  } catch (err) {
    res.json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET);
    res.json({ token, user });

  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
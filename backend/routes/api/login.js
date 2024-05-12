const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/Users");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Find user by username and password
  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;

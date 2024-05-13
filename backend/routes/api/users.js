const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/Users");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: "No Users found" }));
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then((user) => res.json({ msg: "User added successfully" }))
    .catch((err) => res.status(400).json({ error: "user" }));
});

module.exports = router;
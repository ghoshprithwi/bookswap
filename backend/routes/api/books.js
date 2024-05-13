// routes/api/books.js

const express = require("express");
const router = express.Router();

// Load Book model
const Book = require("../../models/Books");
const Users = require("../../models/Users");

router.get("/", async (req, res) => {
  try {
    let query = {};

    // Filter by genre
    if (req.query.genres && req.query.genres.length > 0) {
      const genreRegex = req.query.genres.split(',').map(genre => new RegExp(genre, 'i'));
      query.genres = { $in: genreRegex };
    }

    if (req.query.bookName) {
      query.bookName = { $regex: req.query.bookName, $options: 'i' };
    }

    if (req.query.authorName) {
      query.authorName = { $regex: req.query.authorName, $options: 'i' };
    }

    if (req.query.location) {
      const ownerIds = await Users.find({
        location: { $regex: req.query.location, $options: 'i' }
      }).distinct("_id");
      query.ownerid = { $in: ownerIds };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  const user = await User.findById(req.body.ownerid);
  Book.create(req.body)
    .then(async (book) => {
      res.json({ msg: "Book added successfully" });
       await User.updateOne(
        { _id: req.body.ownerid},
        { $push: { ownedbooks: book._id} }
        
      );
    })
    .catch((err) => res.status(400).json({ error: "book" }));
});

router.get("/owned", async (req, res) => {
  const userId = req.query.id;

  try {
    const user = await User.findById(userId);
    //const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the IDs of the owned books
    const ownedBookIds = user.ownedbooks;
    console.log(ownedBookIds);

    // Find the details of the owned books from the Book collection
    const ownedbooks = await Book.find({ _id: { $in: ownedBookIds } });

    res.json(ownedbooks);
  } catch (err) {
    console.error("Hi");
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/borrowed", async (req, res) => {
  const userId = req.query.id;

  try {
    const user = await User.findById(userId);
    //const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the IDs of the owned books
    const borrowedBookIds = user.borrowedbooks;
    console.log(borrowedBookIds);

    // Find the details of the owned books from the Book collection
    const borrowedbooks = await Book.find({ _id: { $in: borrowedBookIds } });

    res.json(borrowedbooks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// routes/api/books.js

const express = require("express");
const router = express.Router();

// Load Book model
const Book = require("../../models/Books");
const Users = require("../../models/Users");

// @route   GET api/books/test
// @desc    Tests books route
// @access  Public
router.get("/test", (req, res) => res.send("book route testing!"));

// @route   GET api/books
// @desc    Get all books
// @access  Public
// router.get("/", (req, res) => {
//   Book.find()
//     .then((books) => res.json(books))
//     .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
// });

router.get('/', async (req, res) => {
  try {
    let query = {};

    // Filter by genre
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // Filter by authorName
    if (req.query.authorNameName) {
      query.authorName = req.query.authorName;
    }

    // Filter by bookName
    if (req.query.bookName) {
      query.bookName = req.query.bookName;
    }

    // Filter by location
    if (req.query.location) {
      const ownerIds = await Users.find({ location: req.query.location }).distinct('userid');
      query.ownerid = { $in: ownerIds };
    }

    // Filter by availability
    if (req.query.availability) {
      query.status = req.query.availability === 'available' ? 'available' : { $ne: 'available' };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// @route   GET api/books/:id
// @desc    Get single book by id
// @access  Public
router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
});

// @route   POST api/books
// @desc    Add/save book
// @access  Public
router.post("/", (req, res) => {
  Book.create(req.body)
    .then((book) => res.json({ msg: "Book added successfully" }))
    .catch((err) => res.status(400).json({ error: "book" }));
});

// @route   PUT api/books/:id
// @desc    Update book by id
// @access  Public
router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route   DELETE api/books/:id
// @desc    Delete book by id
// @access  Public
router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
});

module.exports = router;

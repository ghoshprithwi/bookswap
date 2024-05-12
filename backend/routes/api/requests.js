const express = require("express");
const User = require("../../models/Users");
const Book = require("../../models/Books");

const router = new express.Router();

router.post('/', async (req, res) => {
  const { bookId, ownerId, userId } = req.body;

  try {
    await User.updateOne(
      { _id: userId},
      { $push: { outgoingRequests: { bookId: bookId, ownerId: ownerId }} }
    )

    await User.updateOne(
      { _id: ownerId},
      { $push: { incomingRequests: { bookId: bookId, requesterId: userId }} }
    )
  } catch (error) {
    console.error('Error updating requests:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});


router.get("/", async (req, res) => {
  const  userId  = req.query.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const incomingRequests = user.incomingRequests.map((request) => request.bookId);

    const books = await Book.find({ _id: { $in: incomingRequests } });

    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;

const express = require("express");
const User = require("../../models/Users");
const Book = require("../../models/Book");

const router = new express.Router();

router.post('/requests', async (req, res) => {
  const { bookId, currentUserId } = req.body;

  try {
    // Find the book by its ID to get the owner ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const ownerId = book.owner;

    // Update the outgoing requests for the current user
    const requester = await User.findById(currentUserId);
    if (!requester) {
      return res.status(404).json({ error: 'Requester not found' });
    }
    requester.outgoingRequests.push({ book: bookId, owner: ownerId });
    await requester.save();

    // Update the incoming requests for the book owner
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    owner.incomingRequests.push({ book: bookId, requester: currentUserId });
    await owner.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating requests:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

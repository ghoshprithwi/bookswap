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
    return res.json({ msg: "Request sent successfully" });
  } catch (error) {
    console.error('Error updating requests:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});


router.get("/", async (req, res) => {
  const userId = req.query.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const incomingRequests = user.incomingRequests.map((request) => ({
      bookId: request.bookId,
      requesterId: request.requesterId,
    }));

    const books = await Book.find({ _id: { $in: incomingRequests.map((request) => request.bookId) } });

    // Append requester information to each book object
    const booksWithRequester = books.map((book) => {
      const request = incomingRequests.find((request) => request.bookId === book._id.toString());
      return {
        ...book.toObject(),
        requester: request ? request.requesterId : null,
      };
    });

    res.json(booksWithRequester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/accept", async (req, res) => {
  const { bookId, ownerId, requesterId} = req.body;
  try {
    await User.updateOne(
      { _id: ownerId},
      { $pull: {incomingRequests:{ bookId: bookId, requesterId: requesterId}} }
    );

    await User.updateOne(
      { _id: requesterId},
      { $pull: {outgoingRequests:{ bookId: bookId, ownerId: ownerId}} }
    );
   
    await User.updateOne(
      { _id: requesterId},
      { $push: { borrowedbooks: bookId} }
    );

    res.json({ message: "Request accepted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/reject", async (req, res) => {
  const { bookId, ownerId, requesterId} = req.body;
  try {
    await User.updateOne(
      { _id: ownerId},
      { $pull: {incomingRequests:{ bookId: bookId, requesterId: requesterId}} }
    );

    await User.updateOne(
      { _id: requesterId},
      { $pull: {outgoingRequests:{ bookId: bookId, ownerId: ownerId}} }
    );
   
    res.json({ message: "Request rejected successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




module.exports = router;

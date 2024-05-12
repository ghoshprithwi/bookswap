
// models/Book.js

const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
  bookid: {
    type: String,
  },
  bookName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  published: {
    type: String,
  },
  condition: {
    type: String,
  },
  genre: {
    type: [String],
  },
  availbility: {
    type: String,
  },
  ownerid: {
    type: String,
  },
  borrowerid: {
    type: String,
  },
  description: {
    type: String,
  }
});

BookSchema.statics.exchangeBook = async function(bookId, newOwnerId) {
  const book = await this.findOne({id: bookId});
  if (!book) {
    throw new Error('Book not found');
  }

  book.ownerid = newOwnerId;
  book.status = 'exchanged';
  await book.save();
  return book;
};

module.exports = Book = mongoose.model('Book', BookSchema);

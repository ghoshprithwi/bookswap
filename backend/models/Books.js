
// models/Book.js

const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  ownerid: {
    type: String,
    required: true

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



const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    userid: {
     type: String,
    },
    password: {
      type: String,
     },    
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    ownedbooks: {
        type: [String]
    },
    borrowedbooks: {
      type: [String],
    },
    requestedbooks: {
      type: [String],
    },
    location: {
      type: String,
    },
    genres: {
      type: [String],
    },
    phone: {
      type: String,
    }
  });
  
  module.exports = User = mongoose.model('User', UsersSchema);
  
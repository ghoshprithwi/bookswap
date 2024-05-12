

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
    incomingRequests: [{
      book: { type: String },
      requester: { type: String }
    }],
    outgoingRequests: [{
      book: { type: String},
      owner: { type: String}
    }],
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
  
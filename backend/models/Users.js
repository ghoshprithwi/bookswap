

const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    userid: {
     type: String,
      required: true 
    },
    password: {
      type: String,
       required: true 
     },    
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    ownedbooks: {
        type: [String],
        required: true
    },
    borrowedbooks: {
      type: [String],
      required: true
    },
    requestedbooks: {
      type: [String],
      required: true
    },
    location: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
    },
  });
  
  module.exports = User = mongoose.model('User', UsersSchema);
  
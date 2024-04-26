

const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    id: {
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
    list: {
        type: [String],
    }
  });
  
  module.exports = User = mongoose.model('User', UsersSchema);
  
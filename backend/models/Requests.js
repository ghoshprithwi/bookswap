const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' },
  deliveryMethod: { type: String, required: true },
  duration: { type: Number, required: true }
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;

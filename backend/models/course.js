const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  accessGranted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Course', courseSchema);

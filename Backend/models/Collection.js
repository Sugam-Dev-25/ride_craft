const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    link: { type: String, required: true } // e.g. /category/road-cycle
  },
  { timestamps: true }
);

module.exports = mongoose.model('Collection', collectionSchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ItemInfo = new Schema({
  image: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const ItemSchema = mongoose.model("Items", ItemInfo);

module.exports = ItemSchema;

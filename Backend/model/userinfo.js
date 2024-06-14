const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CartSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
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
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const UserInfo = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    default: "",
  },
  cart: [CartSchema],
  total: {
    type: Number,
    default: 0,
  },
});

const UserSchema = mongoose.model("User", UserInfo);

module.exports = UserSchema;

const ItemSchema = require("../model/iteminfo");

exports.addItem = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    if (!user.admin) {
      return res.status(200).json({ status: "User not admin" });
    }
    const add = await ItemSchema.create(data);
    return res.status(200).json({ status: "Item Added" });
  } catch (error) {
    return res.status(500).json({ status: "Error" });
  }
};
exports.getItem = async (req, res, next) => {
  try {
    const itemList = await ItemSchema.find();
    return res.status(200).json({ list: itemList });
  } catch {
    return res.status(500).json({ status: "Error" });
  }
};
exports.removeItem = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    if (!user.admin) {
      return res.status(200).json({ status: "User not admin" });
    }
    const remove = await ItemSchema.findByIdAndDelete(data._id);
    return res.status(200).json({ status: "Item Removed" });
  } catch (error) {
    return res.status(500).json({ status: "Error" });
  }
};

const UserSchema = require("../model/userinfo");

exports.addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const userInfo = await UserSchema.findById(user._id);
    const userCart = userInfo.cart;
    const chkItemExi = userCart.find((item) => {
      return item.itemId.toString() === data._id;
    });

    if (chkItemExi) {
      const chkItemExi = userCart.findIndex((item) => {
        return item.itemId.toString() === data._id;
      });
      userCart[chkItemExi].quantity++;
      userInfo.total += userCart[chkItemExi].price;
      await userInfo.save();
    } else {
      userCart.push({
        ...data,
        itemId: data._id,
        quantity: 1,
      });
      userInfo.total += data.price;
      await userInfo.save();
    }
    return res.status(200).json({ status: "Item added to cart" });
  } catch (e) {
    return res.status(500).json({ status: "Error" });
  }
};

exports.remCart = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const userInfo = await UserSchema.findById(user._id);
    const userCart = userInfo.cart;
    if (userCart.length === 0) {
      return res.status(200).json({ status: "Cart is empty" });
    }
    const chkItemExi = userCart.findIndex((item) => {
      return item.itemId.toString() === data._id;
    });
    const item = userCart.splice(chkItemExi, 1);
    console.log(item);
    userInfo.total -= item[0].price * item[0].quantity;

    await userInfo.save();
    return res.status(200).json({ status: "Item removed" });
  } catch {
    return res.status(500).json({ status: "Error" });
  }
};

exports.chkOut = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const userInfo = await UserSchema.findById(user._id);
    userInfo.cart = [];
    userInfo.address = data.address;
    userInfo.total = 0;
    await userInfo.save();
    return res.status(200).json({ status: "Cheackout Success" });
  } catch {
    return res.status(500).json({ status: "Error" });
  }
};

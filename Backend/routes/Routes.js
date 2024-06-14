const express = require("express");
const Routes = express.Router();
const UserInfo = require("../controllers/User");
const ItemInfo = require("../controllers/Item");
const CartInfo = require("../controllers/Cart");
const Verify = require("../middleware/tokenverify");

Routes.post("/signup", UserInfo.UserSignup);
Routes.post("/login", UserInfo.UserLogin);
Routes.get("/getuser", Verify.verifyUser, UserInfo.userInfo);
Routes.post("/additem", Verify.verifyUser, ItemInfo.addItem);
Routes.get("/getitem", Verify.verifyUser, ItemInfo.getItem);
Routes.post("/removeitem", Verify.verifyUser, ItemInfo.removeItem);
Routes.post("/addcart", Verify.verifyUser, CartInfo.addToCart);
Routes.post("/remcart", Verify.verifyUser, CartInfo.remCart);
Routes.post("/chkout", Verify.verifyUser, CartInfo.chkOut);

module.exports = Routes;

const bcrypt = require("bcrypt");
const UserSchema = require("../model/userinfo");

const jwttoken = require("jsonwebtoken");

const GenrateAccessToken = (data) => {
  var token = jwttoken.sign(data, "aditya");
  return token;
};

exports.UserSignup = async (req, res, next) => {
  try {
    const data = req.body;
    let error = false;
    const password = req.body.password;
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.send("Error");
      }
      const User = await UserSchema.find({ email: data.email });
      if (User.length !== 0) {
        error = true;
      } else {
        await UserSchema.create({
          email: data.email,
          password: hash,
          admin: data.admin,
          address: "",
          cart: [],
        });
      }
      if (error) {
        return res.status(200).json({ status: "User Already Registered" });
      } else {
        return res.status(200).json({ status: "User Registered" });
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "Error" });
  }
};

exports.UserLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const password = req.body.password;
    const User = await UserSchema.findOne({ email: data.email });

    if (!User) {
      return res.status(200).json({ status: "User not found" });
    }

    bcrypt.compare(password, User.password, function (err, result) {
      if (err) {
        return res.status(500).json({ status: "Error" });
      }

      if (result) {
        const GenrateToken = GenrateAccessToken({
          _id: User._id,
          email: User.email,
          admin: User.admin,
        });

        return res.status(200).json({
          token: GenrateToken,
          admin: User.admin,
          email: User.email,
        });
      } else {
        return res.status(200).json({ status: "Invalid password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "Error" });
  }
};

exports.userInfo = async (req, res, next) => {
  try {
    const user = req.user;
    const userInfo = await UserSchema.findById(user._id);
    return res.status(200).json({ inf: userInfo });
  } catch {
    return res.status(500).json({ status: "Error" });
  }
};

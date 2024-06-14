const express = require("express");
const jwttoken = require("jsonwebtoken");
exports.verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    jwttoken.verify(token, "aditya", function (err, decoded) {
      if (err) {
        return res.send("error");
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch {
    return res.send("err");
  }
};

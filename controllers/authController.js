const passport = require("passport");
const mongoose = require("mongoose");
const db = require("../models");
const User = db.User;

module.exports.register = async (req, res, next) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({
      userInfo: user
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports.login = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(401).json(err);
      return;
    }

    if (user) {
      res.status(200).json({
        userInfo: user
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

const db = require("../models");
const User = db.user;

checkDuplicateMobileorEmail = (req, res, next) => {
  // Mobilenumber
  User.findOne({
    mobilenumber: req.body.mobilenumber
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! mobilenumber is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateMobileorEmail
};
module.exports = verifySignUp;

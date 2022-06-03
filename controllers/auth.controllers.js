const config = require("../auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  console.log(req.body)
  var body = req.body;
  const password = body.password;
  const confirmPassword = body.confirmpassword;
  if (password === confirmPassword) {
    const user = new User({
      name: req.body.username,
      mobilenumber: req.body.mobilenumber,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
    return res.status(200).send({ message: "signup success", data: user });
  } else {
    return res.status(200).send({ message: "Password and Confirm Password is not match" });
  }
};


exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }
      let token = jwt.sign({name:user.name},'tokenValue',{expiresIn:'1hr'})
      
      res.status(200).send({
        id: user._id,
        name: user.name,
        mobilenumber:user.mobilenumber,
        email: user.email,
        token
      });
    });
};




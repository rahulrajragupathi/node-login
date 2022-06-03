const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controllers");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/signup", verifySignUp.checkDuplicateMobileorEmail, controller.signup);
  app.post("/api/auth/login", controller.login);


  
};
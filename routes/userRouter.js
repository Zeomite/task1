const express = require("express");
const { signup, signin, updatepassword, forgotpass  } = require("../controllers/userController");
const passport = require("passport");
require("../passportConfig.js")(passport);

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin",passport.authenticate('jwt', { session: false }), signin);
userRouter.post("/forgotpass",passport.authenticate('jwt', { session: false }), forgotpass);
userRouter.post("/updatepassword",passport.authenticate('jwt', { session: false }), updatepassword);


module.exports = userRouter;

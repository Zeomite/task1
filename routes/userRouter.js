const express = require("express");
const { signup, signin, updatepassword, forgotpass  } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/forgotpass", forgotpass);
userRouter.post("/updatepassword",updatepassword);


module.exports = userRouter;
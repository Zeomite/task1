const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const passport = require("passport");


app.use(express.json());
app.use(passport.initialize())



app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/user", userRouter );
app.use("/post", postRouter );
app.use("/comment", commentRouter );



const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on ${port}, http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

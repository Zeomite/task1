const express = require("express");
const { create, update, remove, read, like, upload } = require("../controllers/postController");
const passport = require("passport");
require("../passportConfig")(passport);

const postRouter = express.Router();

postRouter.post("/create",passport.authenticate('jwt', { session: false }), upload.single('file'), create);
postRouter.post("/update",passport.authenticate('jwt', { session: false }), upload.single('file'), update);
postRouter.post("/delete",passport.authenticate('jwt', { session: false }), remove);
postRouter.post("/read",passport.authenticate('jwt', { session: false }), read);
postRouter.post("/like", passport.authenticate('jwt', { session: false }),like)



module.exports = postRouter;

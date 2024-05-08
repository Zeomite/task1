const express = require("express");
const { create, update, remove, read, like, upload } = require("../controllers/postController");
const ifPostImage = require("../middleware/contentMiddleware");


const postRouter = express.Router();

postRouter.post("/create", upload.single('file'), create);
postRouter.post("/update", upload.single('file'), update);
postRouter.post("/delete", remove);
postRouter.post("/read", read);
postRouter.post("/like", like)



module.exports = postRouter;
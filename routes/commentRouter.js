const express = require('express');
const commentController = require('../controllers/commentController');
const passport = require("passport");
require("../passportConfig.js")(passport);

const commentRouter = express.Router();

commentRouter.post('/create', passport.authenticate('jwt', { session: false }),commentController.create);
commentRouter.post('/update',passport.authenticate('jwt', { session: false }), commentController.update);
commentRouter.post('/delete',passport.authenticate('jwt', { session: false }), commentController.remove);

module.exports = commentRouter;

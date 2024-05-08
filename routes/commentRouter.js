const express = require('express');
const commentController = require('../controllers/commentController');

const commentRouter = express.Router();

commentRouter.post('/create', commentController.create);
commentRouter.post('/update', commentController.update);
commentRouter.post('/delete', commentController.remove);

module.exports = commentRouter;

var express = require('express');

var postController = require('../controllers/post.controller');

var router = express.Router();

router.post('/addPost', postController.addPost);
router.get('/get-all-post', postController.getallPost);

router.get('/get-user-by-post-id/:id', postController.getUserByPostId);
router.put('/updateUserById', postController.updatePostById);

module.exports = router;


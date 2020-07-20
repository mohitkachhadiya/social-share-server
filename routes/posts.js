var express = require('express');

var postController = require('../controllers/post.controller');

var router = express.Router();

router.post('/addPost', postController.addPost);
router.get('/get-all-post', postController.getallPost);



module.exports = router;


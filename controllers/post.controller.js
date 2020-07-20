var Post = require('../models/posts.model');
var postController = {};
var ObjectId = require('mongoose').Types.ObjectId;

postController.addPost = function (req, res) {
    console.log("req body of post is  =======>", req.body);
    var post = new Post({
        userId: req.body.userId,
        time: req.body.time,
        discription: req.body.discription,
        image: req.body.image,
        like: req.body.like
    });
    post.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else{
            console.log('Error of addPost :' + JSON.stringify(err, undefined, 2));
        }
    })
}

postController.getallPost = function (req, res) {
    Post.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else{
            console.log('Error of getUsers :' + JSON.stringify(err, undefined, 2));
        }
    })
}


module.exports = postController;
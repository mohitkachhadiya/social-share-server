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

postController.getUserByPostId = function (req, res) {
    Post.findOne({_id : req.params.id} , (err  , doc)=>{
        if(err){
            res.status(404).send(err);
        }
        else{
            if(err){
                response  = { message :  "No User Found"};
                res.status(400).send(response);    
            }
            else{
                res.status(200).send(doc);
            }
        }
    });
}

postController.updateUserById = function (req, res) {
    console.log('req.body ============================>', req.body)
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Id not found : ${req.params.id}`);
    var emp = {
        userId: req.body.userId,
        time: req.body.time,
        discription: req.body.discription,
        image: req.body.image,
        like: req.body.like
    };
    Post.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { 
            res.send(doc);
        }
        else { 
            console.log('Error in updateUserById :' + JSON.stringify(err, undefined, 2)); 
        }
    });   
}

module.exports = postController;
var Post = require('../models/posts.model');
var postController = {};
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../models/user.model');
likesarray = [];

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

postController.updatePostById = function (req, res) {
    console.log('req.body ============================>', req.body);

    if(likesarray.indexOf(req.body.userId) === -1) {
        likesarray.push(req.body.userId);
        console.log(likesarray);
    }
    else {
        const id = req.body.userId;
        const removableId = likesarray.indexOf(id);
        console.log("the removableId id ------------->", removableId);
        if (removableId > -1) {
            console.log('the called');
            likesarray.splice(removableId, 1);
        }
    }
    console.log('the likesarray is ===========>', likesarray);


    if (!ObjectId.isValid(req.body.id))
        return res.status(400).send(`Id not found : ${req.body.id}`);
    var emp = {
        likes: likesarray,
    };
    Post.findByIdAndUpdate(req.body.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { 
            res.send(doc);
        }
        else { 
            console.log('Error in updateUserById :' + JSON.stringify(err, undefined, 2)); 
        }
    });   
}

module.exports = postController;
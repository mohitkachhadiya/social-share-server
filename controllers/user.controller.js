var User = require('../models/user.model');
var userController = {};
var ObjectId = require('mongoose').Types.ObjectId;

userController.login = function(req,res){
	console.log("req body of login is =====>" , req.body.email , "======>" , req.body.password);
	User.findOne({email: req.body.email , password: req.body.password } ,async (err,foundUser)=>{
		if(err){
			console.log("err is login");
			res.status(404).send(err);
		}
		else if(foundUser == null){
			res.status(400).send(err);
		}
		else{
			res.status(200).send(foundUser);
		}
	});
}

userController.signUp = function (req, res) {
    var emp = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error of addUser :' + JSON.stringify(err, undefined, 2)); }
    });
}

userController.getUserById = function (req, res) {
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


module.exports = userController;
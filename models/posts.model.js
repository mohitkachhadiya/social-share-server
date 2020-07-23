const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
	userId: { type: Schema.Types.ObjectId , ref: 'User' , autopopulate: true},
	time: {type: String},
	discription: {type: String},
	image: {type: String},
	likes: { type: Array },
	likesCount: {type: Number}
});


PostSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Post' , PostSchema); 

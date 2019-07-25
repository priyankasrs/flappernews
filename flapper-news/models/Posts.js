var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	link: String,
	upvotes:{type:Number, default:0},
	comments: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

PostSchema.methods.upvote = function(cb){
	this.upvote += 1;
	this.save(cb);
};


module.export = mongoose.model('Post',PostSchema);
/*帖子信息模型*/ 
const db = require('./../db');
const mongoose = db.mongoose;
const Schema = db.Schema;

const msgSchema = new Schema({
	title:{
		type: String,
		default: ''
	},
	connect: {
		type: String,
		default: ''
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	creatTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	},
	readNumber: {
		type: Number,
		default: 0
	},
	replyNumber: {
		type: Number,
		default: 0
	}
})
const Message = mongoose.model('message',msgSchema);
module.exports = Message
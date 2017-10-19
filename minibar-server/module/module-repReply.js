/*单个回帖信息模型*/ 
const db = require('./../db');
const mongoose = db.mongoose;
const Schema = db.Schema;

const repReplySchema = new Schema({
	connect: {
		type: String,
		default: ''
	},
	user_id:{
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	msg_id:{
		type: Schema.Types.ObjectId,
		ref: 'message',
	},
	rep_id: {
		type: Schema.Types.ObjectId,
		ref: 'msgReply',
	},
	createTime: {
		type: Date,
		default: Date.now
	},
})
const RepReply = mongoose.model('repReply',repReplySchema);

module.exports = RepReply;
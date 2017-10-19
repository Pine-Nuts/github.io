/*底部回帖信息模型*/ 
const db = require('./../db');
const mongoose = db.mongoose;
const Schema = db.Schema;

const msgReplySchema = new Schema({
	connect: {
		type: String,
		default: ''
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	msg_id: {
		type: Schema.Types.ObjectId,
		ref: 'message'
	},
	createTime: {
		type: Date,
		default: Date.now
	},
})
const MsgReply = mongoose.model('msgReply',msgReplySchema);
module.exports = MsgReply;
/*标签信息模型*/ 
const db = require('./../db');
const mongoose = db.mongoose;
const Schema = db.Schema;

const tagSchema = new Schema({
	name:{
		type: String,
		default: ''
	},
	connect: {
		type: String,
		default: ''
	},
	createTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	}
})

const Tag = mongoose.model('tag',tagSchema);
module.exports = Tag
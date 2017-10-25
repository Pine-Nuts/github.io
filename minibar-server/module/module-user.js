/*用户信息模型*/
const db = require('./../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const userSchema = new Schema({
	username: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	isMale: {
		type: Boolean,
		default: true
	},
	age: {
		type: Number,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	userphoto: {
		type: String,
		default: '/images/user.png'
	},
	createTime: {
		type: Date,
		default: Date.now
	},
	updateTime: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		default: ''
	},
})
const User = mongoose.model('user',userSchema);
module.exports = User;
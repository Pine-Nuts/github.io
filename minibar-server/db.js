const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mini-bar',{
	useMongoClient: true
},err=>{
	if(err){
		console.log(err);
		console.log('数据库链接失败...')
	}
	else{
		console.log('数据库链接成功')
	}
});
module.exports = {
	mongoose: mongoose,
	Schema: Schema
}
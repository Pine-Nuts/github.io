const express = require('express');
const msgReply = require('./../../../module/module-msgReply');
const Article = require('./../../../module/module-message');
const router = express.Router();

// 底部回复列表
router.get('/',(req,res) => {
	let page = 1; // 当前页面
	if(req.query.page){
		page = req.query.page
	}	
	let msg={}
	if(req.query.id){
		msg.msg_id=req.query.id
	}
	var queryCount = msgReply.count(msg)
	var queryData = msgReply.find(msg)
		.sort()
		.populate('user_id')
		.limit(global.pageSize)
		.skip((page-1)*global.pageSize);
	const pAll = Promise.all([queryCount,queryData])
		pAll.then(([allCount,data]) => {
			const pageCount = Math.ceil(allCount/global.pageSize)
			res.json({
				status: 'y',
				msg: '获取数据成功',
				data: {
					list: data,
					pageCount,
					pageIndex: page
				}
			})
		})
})


// 创建底部回复
router.post('/create',(req,res) => {
	var model = new msgReply(req.body)
		model.save()
			.then(data=>{
				// res.send('保存成功')
				res.json({
					status:'y',
					msg:'创建数据成功'
				})
				Article.findById(data.msg_id)
				.then(arr=>{
					arr.replyNumber += 1;
					Article.findByIdAndUpdate(data.msg_id,arr)
					.then(data=>{
						console.log('更新成功')
					})
					.catch(data=>{
						console.log('更新失败')
					})
				})
			})
			.catch(err=>{
				console.log(err)
				res.json({
					status:'n',
					msg:'创建数据失败'
				})
			})
})
module.exports = router;
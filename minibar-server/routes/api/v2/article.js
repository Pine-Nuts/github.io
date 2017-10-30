const express = require('express');
const router = express.Router();
const Article = require('./../../../module/module-message');
// 帖子列表显示
router.get('/',(req,res) => {
	let page = 1; // 当前页面
	if(req.query.page){
		page = req.query.page
	}	
	let tag={}
	if(req.query.id){
		tag.tag_id=req.query.id
	}
	var queryCount = Article.count(tag)
	var queryData = Article.find(tag)
		.sort({_id: -1})
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

// 创建帖子
router.post('/create',(req,res) => {
	var model = new Article(req.body)
		model.save()
			.then(data=>{
				console.log(data);
				// res.send('保存成功')
				res.json({
					status:'y',
					msg:'创建数据成功'
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

// 单个帖子
router.get('/one',(req,res) => {
	var query={}
	if(req.query.id){
		query._id = req.query.id
	}
	let number
	Article.findById(query)
	.then(data=>{
		data.readNumber += 1;
		number = data.readNumber
		res.json({
			status:'y',
			msg:'获取数据成功',
			data
		});
	})
	Article.findByIdAndUpdate(req.query.id,{$push:{readNumber:number}})
		.then(data=>{
			console.log('更新成功')
		})
		.catch(data=>{
			console.log('更新失败')
		})
})

module.exports = router;
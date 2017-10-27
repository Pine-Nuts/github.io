const express = require('express');
const router = express.Router();
const Article = require('./../../../module/module-message');
const utils = require('./../../../tools/utils');

// 帖子列表显示
router.get('/',(req,res) => {
	let page = 1; // 当前页面
	if(req.query.page){
		page = req.query.page
	}
	var queryCount = Article.count()
	var queryData = Article.find({})
		.sort({_id: -1})
		.populate('user_id tag_id')
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

// 查看单个帖子
router.get('/one',(req,res) => {
	var query={}
	if(req.query.id){
		query._id = req.query.id
	}
	Article.findById(query)
	.populate('user_id')
	.then(data=>{
		res.json({
			status:'y',
			msg:'获取数据成功',
			data
		});
	})
})

// 创建帖子
router.post('/create',(req,res) => {
	new Article(req.body).save()
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

// 更新帖子
router.post('/update/:id',(req,res) => {
	req.body.updateTime = new Date()
	Article.findByIdAndUpdate(req.params.id,req.body)
	.then(data=>{
		console.log(data);
		// res.send('保存成功')
		res.json({
			status:'y',
			msg:'更新数据成功'
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({
			status:'n',
			msg:'更新数据失败'
		})
	})
})

// 删除帖子
router.post('/del/:id',(req,res)=>{
	Article.findByIdAndRemove(req.params.id)
		.then(data=>{
			res.json({
				status:'y',
				msg:'删除数据成功'
			})
		})
		.catch(err=>{
			console.log(err)
			res.json({
				status:'n',
				msg:'删除数据失败'
			})
		})
})
module.exports = router;
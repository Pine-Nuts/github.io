const express = require('express');
const router = express.Router();
const Tag = require('./../../../module/module-tag');
const Article = require('./../../../module/module-message');
const Reply = require('./../../../module/module-msgReply');

// 标签列表显示
router.get('/',(req,res) => {
	let page = 1; // 当前页面
	if(req.query.page){
		page = req.query.page
	}
	var queryCount = Tag.count()
	var queryData = Tag.find({})
		.sort({_id: -1})
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

// 单个标签详情显示
router.get('/one',(req,res) => {
	var query={}
	if(req.query.id){
		query._id = req.query.id
	}
	Tag.findById(query)
	.then(data=>{
		res.json({
			status:'y',
			msg:'获取数据成功',
			data
		});
	})
})

// 创建标签
router.post('/create',(req,res) => {
	var model = new Tag(req.body)
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

// 更新标签
router.post('/update/:id',(req,res) => {
	req.body.updateTime = new Date()
	Tag.findByIdAndUpdate(req.params.id,req.body)
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

// 删除标签
router.post('/del/:id',(req,res)=>{
	var artrm =	Article.remove({user_id:req.params.id})
	var reprm =	Reply.remove({user_id:req.params.id})
	var tagrm = Tag.findByIdAndRemove(req.params.id)
	const pAll = Promise.all([artrm,reprm,tagrm])
		pAll.then(([artdt,repdt,tagdt])=>{
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
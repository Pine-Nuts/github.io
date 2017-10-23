const express = require('express');
const router = express.Router();
const Member = require('./../../../module/module-user');
const utils = require('./../../../tools/utils');

// 用户列表显示
router.get('/',(req,res) => {
	console.log(req.query.page)
	let page = 1; // 当前页面
	if(req.query.page){
		page = req.query.page
	}
	var queryCount = Member.count()
	var queryData = Member.find({})
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

// 单个用户详情显示
router.get('/one',(req,res) => {
	var query={}
	if(req.query.id){
		query._id = req.query.id
	}
	Member.findById(query)
	.then(data=>{
		res.json({
			status:'y',
			msg:'获取数据成功',
			data
		});
	})
})

// 创建用户
router.post('/create',(req,res) => {
	req.body.password = utils.md5(req.body.password)
	var model = new Member(req.body)
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

// 更新用户
router.post('/update/:id',(req,res) => {
	Member.findByIdAndUpdate(req.params.id,req.body)
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

// 删除用户
router.post('/del/:id',(req,res)=>{
	Member.findByIdAndRemove(req.params.id)
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
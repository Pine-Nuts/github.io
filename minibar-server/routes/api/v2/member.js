const express = require('express');
const router = express.Router();
const Member = require('./../../../module/module-user');
const utils = require('./../../../tools/utils');

//登陆
router.post('/login',(req,res) => {
	Member.findOne({'username': req.body.username}).select('username password')
	.then(data => {
		console.log(data)
		req.body.password = utils.md5(req.body.password);
		console.log(req.body.password)
		console.log(data.password)
		if (data.password == req.body.password) {
				res.json({status: 'y', msg: '登陆成功!', id: data._id})
		} else {
				res.json({status: 'n', msg: '密码错误!'})
		}
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
	req.body.updateTime = new Date()
	req.body.password = utils.md5(req.body.password)
	new Member(req.body).save()
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

module.exports = router;
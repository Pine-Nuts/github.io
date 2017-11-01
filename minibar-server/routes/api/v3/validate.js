const express = require('express');
const router = express.Router();
const Member = require('./../../../module/module-user');
const utils = require('./../../../tools/utils');

// 验证用户名是否存在
router.get('/admin_user_name',(req,res)=>{
	// console.log(req.query);
	AdminUser.count({user_name:req.query.user_name})
	.then(c=>{
		if(c>0){
			res.send(false)
		}
		else{
			res.send(true);
		}
	})
})
// 验证用户名是否存在
router.get('/member_username',(req,res)=>{
	// console.log(req.query);
	Member.count({username:req.query.username})
	.then(c=>{
		if(c>0){
			res.json({
				status: 'n',
			})
		}
		else{
			res.json({
				status: 'y',
			})
		}
	})
})
router.get('/member_password',(req,res)=>{
	// console.log(req.query);
	let pwd = utils.md5(req.query.password);
	Member.findById(req.query.id)
	.then(data=>{
		if(data.password == pwd){
			res.json({
				status: 'y'
			})
		}
		else{
			res.json({
				status: 'n'
			})
		}
	})
})

// router.get('/member_email',(req,res)=>{
// 	// console.log(req.query);
// 	Member.count({email:req.query.email})
// 	.then(c=>{
// 		if(c>0){
// 			res.send(false)
// 		}
// 		else{
// 			res.send(true);
// 		}
// 	})
// })
// router.get('/member_mobile',(req,res)=>{
// 	// console.log(req.query);
// 	Member.count({mobile:req.query.mobile})
// 	.then(c=>{
// 		if(c>0){
// 			res.send(false)
// 		}
// 		else{
// 			res.send(true);
// 		}
// 	})
// })
module.exports = router;
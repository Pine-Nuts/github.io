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

module.exports = router;
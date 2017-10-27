const express = require('express');
const router = express.Router();
const Tag = require('./../../../module/module-tag');

// 标签列表显示
router.get('/',(req,res) => {
	Tag.find().then((data) => {
			res.json({
				status: 'y',
				msg: '获取数据成功',
				data
			})
		})
})
module.exports = router;
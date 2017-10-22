var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 全局设置
global.baseDir = __dirname; // 项目所在目录
global.pageSize = 5; // 分页的页数

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

const AdminUser = require('./module/module-user');
const utils = require('./tools/utils');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 系统初始化，创建管理员
AdminUser.count({username: 'admin'})
	.then(c => {
		if(c == 0){
			let admin = new AdminUser({
				username : 'admin',
				password : 'admin',
				description : '管理员',
				isEncryption : 0
			})
			admin.save()
				.then(date => {
					console.log('系统初始化完成，管理员已添加')
				})
				.catch(err => {
					console.log(err);
				})
		}
	})
	// 管理后台登录
app.post('/api/v1/admin/login',(req,res) => {
	console.log(req.body)
	if(req.body.username == 'admin'){
		if(req.body.username == 'admin' && req.body.password == 'admin'){
			res.cookie('admin_user','admin',{ path: '/' });
			res.json({ status: 'y', msg: '登陆成功' })
		}
		else{
			res.json({ status: 'n', msg: '登录失败' })
		}
	}
	else{
		res.json({ status: 'n', msg: '您不是管理员' })

	// AdminUser.findOne({'$or':[
	// 	{username:req.body.username},
	// 	{phone:req.body.username}
	// ]}).then(u => {
	// 	if(u){
	// 		var strPwd = md5(req.body.password);
	// 		if(u.password == strPwd){
	// 			// 登录成功写入cookie
	// 			res.cookie('admin_user',u.id,{path:'/'})
	// 			res.json({
	// 				status: 'y',
	// 				msg: '登陆成功'
	// 			})
	// 		}
	// 		else {
	// 			res.json({
	// 				status: 'n',
	// 				msg: '管理员密码错误'
	// 			})
	// 		}
	// 	}
	// 	else{
	// 		res.json({
	// 			status: 'n',
	// 			msg: '用户不存在'
	// 		})
	// 	}
	// })
	}
})
// 设置管理后台的访问权限
app.all('/api/v1/admin/*',(req,res,next) => {
	if(req.cookies.admin_user){
		next();
	}
	else( //没有登录进入登录页面
		res.json({
			status: 'none',
			msg: '请登录'
		})
	)
})
app.use('/api/v1/admin/member',require('./routes/api/v1/member'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

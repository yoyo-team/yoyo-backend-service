let express = require('express');
let config=require('./config');

let app = express();

// 应用配置
app.set('trust proxy',true);

// 设置中间件
require('../middlewares')(app);

// 设置路由
app.use('/',require('./router'));

// 处理各种异常和错误
require('./exceptions')(app);

// 启动服务器
app.listen(config.http.port, server_online);

function server_online()
{
    console.log(`app listening at http://localhost:${config.http.port}`);
}
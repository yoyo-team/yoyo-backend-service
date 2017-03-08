let router=require('express').Router();

// router.use(function middleware(req,res,next)
// {
//     console.log(req.url);
//     console.log(req.method);
//     next();
// });
//注意，中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行

// router.param('name',function(req,res,next,name)
// {
//     console.log(name);
//     req.name=name;
//     next();
// });
//上面代码中，get方法为访问路径指定了name参数，param方法则是对name参数进行处理。注意，param方法必须放在HTTP动词方法之前。

// route items goes here !

// '/'
router.get('/', require('../../handlers/index').get);

// 'register'
router.get('/add_note', require('../../handlers/add_note').get);
router.get('/delete_note', require('../../handlers/delete_note').get);
router.get('/get_class', require('../../handlers/get_class').get);
router.get('/get_location', require('../../handlers/get_location').get);
router.get('/get_notes', require('../../handlers/get_notes').get);
router.get('/query_class', require('../../handlers/query_class').get);
router.get('/release', require('../../handlers/release').get);
router.post('/release', require('../../handlers/release').post);
router.get('/set_location', require('../../handlers/set_location').get);








module.exports=router;
function handle_exceptions(app)
{
    // 404 处理
    app.use(function(req,res,next)
    {
        res.status(200).json({status:'404'});
    });

    //错误处理
    app.use(function(err,req,res,next)
    {
        console.log(err.stack);
        res.status(200).json({status:'not_handled_error',message:'这个错误没有被处理，由默认错误处理函数捕获'});
    });
}

module.exports=handle_exceptions;
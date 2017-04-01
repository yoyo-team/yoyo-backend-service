let express=require('express');

function use_middlewares(app)
{
    if(app.use)
    {
        // app.use(express.router);
        // app.use(json);
    }
}

function json(req,res,next)
{
    res.json = function(data)
    {
        this.status(200)
            .json(data);
    };
    next();
}

module.exports=use_middlewares;
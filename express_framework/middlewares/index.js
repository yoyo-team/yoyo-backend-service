let express=require('express');
let body_parser=require('body-parser');

function use_middlewares(app)
{
    if(app.use)
    {
        // app.use(express.router);
        // app.use(body_parser);
    }
}

module.exports=use_middlewares;
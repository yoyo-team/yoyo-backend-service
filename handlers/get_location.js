let db=global.vars.db;
let check=global.vars.check;

module.exports.get=function(req,res)
{
    let query=req.query;
    console.log(query);
    if(!query.uid)
    {
        res.status(200).json
        (
            {
                status:'no_uid'
            }
        );
        return ;
    }
    // if(!query.access_token)
    // {
    //     res.status(200).json
    //     (
    //         {
    //             status:'no_access_token'
    //         }
    //     );
    //     return ;
    // }
    let sql=`select location from yoyo.user where uid='${query.uid}'`;
    console.log(sql);
    db.query(sql,function(err,rows,fields)
    {
        if(err)
        {
            console.log(err);
            res.status(200).json
            (
                {
                    status:'db_error'
                }
            );
        }
        else
        {
            res.status(200).json
            (
                {
                    status:'ok',
                    message:
                        {
                            location:rows[0].location
                        }
                }
            );
        }
    });
    // check(query.uid,query.access_token)
    //     .then(function()
    //     {
    //
    //     },function()
    //     {
    //         res.status(200).json
    //         (
    //             {
    //                 status:'access_denied'
    //             }
    //         );
    //     })
    // ;
};
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
    if(!query.location)
    {
        res.status(200).json
        (
            {
                status:'no_location'
            }
        );
        return ;
    }
    let sql=`update yoyo.user set location='${query.location}' where uid='${query.uid}'`;
    console.log(sql);
    db.query(sql,function(err,result)
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
            console.log(result);
            if(result.affectedRows===1)
            {
                res.status(200).json
                (
                    {
                        status:'ok'
                    }
                );
            }
            else
            {
                let sql=`insert into yoyo.user (uid,location) values ('${query.uid}','${query.location}'); `;
                console.log(sql);
                db.query(sql,function(err,result)
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
                        console.log(result);
                        if (result.affectedRows === 1) {
                            res.status(200).json
                            (
                                {
                                    status: 'ok'
                                }
                            );
                        }
                        else
                        {
                            res.status(200).json
                            (
                                {
                                    status:'no_effect',
                                    message:'设置location失败'
                                }
                            );
                        }
                    }
                });
            }
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
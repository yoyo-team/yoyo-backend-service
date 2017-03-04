let db=global.vars.db;

module.exports.get=function(req,res)
{
    let query=req.query;
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
    if(!query.cid)
    {
        res.status(200).json
        (
            {
                status:'no_cid'
            }
        );
        return ;
    }
    if(!query.segments)
    {
        res.status(200).json
        (
            {
                status:'no_segments'
            }
        );
        return ;
    }
    let sql=`insert into yoyo.note (uid,cid,segments) values ( '${query.uid}','${query.cid}','${query.segments}' );`
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
                res.status(200).json
                (
                    {
                        status:'failed',
                        message:'添加笔记失败'
                    }
                );
            }
        }
    });
};
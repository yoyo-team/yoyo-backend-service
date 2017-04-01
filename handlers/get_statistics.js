let db=global.vars.db;
let fs=require('fs');
let path=require('path');

module.exports.get=function(req,res)
{
    let query=req.query;
    if(!query.cid)
    {
        res.status(200).json
        (
            {
                status:'no_cid',
            }
        );
        return ;
    }
    let sql=`select segments from yoyo.note where cid='${query.cid}' ;`;
    db.query(sql,function(err,rows,fields)
    {
        if(err)
        {
            res.status(200).json
            (
                {
                    status:'db_error'
                }
            );
            console.log(err);
        }
        else
        {
            let counts = {};
            console.log(rows);
            rows.forEach(function(e)
            {
                e.segments.split(',').forEach(function(e)
                {
                    if(counts[e])
                    {
                        counts[e]++;
                    }
                    else
                    {
                        counts[e]=1;
                    }
                });
            });
            res.status(200).json(counts);
        }
    });

};
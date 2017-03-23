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
    let sql=`select * from yoyo.class where cid='${query.cid}' ;`;
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
            if(rows.length===1)
            {
                let file=path.resolve(`/web/sites/luoc.co/yoyo/classes/${query.cid}/index.json`);
                if(fs.existsSync(file))
                {
                    file=fs.readFileSync(file);
                    console.log(file);
                    try
                    {
                        res.status(200).json
                        (
                            {
                                status:'ok',
                                message:
                                    {
                                        cid:query.cid,
                                        meta:rows[0],
                                        segments:JSON.parse(file)
                                    }
                            }
                        );
                    }
                    catch(e)
                    {
                        console.log(e);
                        res.status(200).json
                        (
                            {
                                status:'json_parse_error',
                                message:'转换课程内容时出错，该课程可能已毁坏'
                            }
                        );
                    }
                }
                else
                {
                    res.status(200).json
                    (
                        {
                            status:'not_exist',
                            message:'该课程不存在'
                        }
                    );
                }
            }
            else
            {
                res.status(200).json
                (
                    {
                        status:'not_exist',
                        message:'该课程不存在'
                    }
                );
            }
        }
    });

};
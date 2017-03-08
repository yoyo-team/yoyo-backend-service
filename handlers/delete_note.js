let db=global.vars.db;

function delete_note(req,res)
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
    let sql=`delete from yoyo.note where uid='${query.uid}' and cid='${query.cid}' ; `;
    db.query(sql,function(err,result)
    {
        if(err)
        {
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
                    status:'ok'
                }
            );
        }
    })
}

module.exports.get=delete_note;
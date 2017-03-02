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
    let sql=`select cid,segments from yoyo.note where uid='${query.uid}'`;
    db.query(sql,function(err,rows)
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
                    message:rows
                }
            );
        }
    })
};
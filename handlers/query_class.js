let db=global.vars.db;

module.exports.get=function(req,res)
{
    let key=req.query.key;
    if(!key)
    {
        res.status(200).json
        (
            {
                status:'no_key'
            }
        )
    }
    else
    {
        let sql=`select * from yoyo.class where name like '%${key}%' or location like '%${key}%' or releaser like '%${key}%' ; `;
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
                )
            }
            else
            {
                res.status(200).json
                (
                    {
                        status:'ok',
                        message:rows
                    }
                )
            }
        })
    }
};
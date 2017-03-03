let db=global.vars.db;

module.exports.get=function(req,res)
{
    let class_name=req.query.class_name;
    if(!class_name)
    {
        res.status(200).json
        (
            {
                status:'no_class_name'
            }
        )
    }
    else
    {
        let sql=`select * from yoyo.class where name like '%${class_name}%'`;
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
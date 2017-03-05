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
    let file=path.resolve(`./classes/${query.cid}/index.json`);
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
                    message:JSON.parse(file)
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
};